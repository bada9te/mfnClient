import { useLazyQuery, useMutation, useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { CHAT_MESSAGES_BY_CHAT_ID_QUERY, CHAT_MESSAGE_CREATE_MUTATION, CHAT_MESSAGE_UPDATE_MUTATION } from "../../../utils/graphql-requests/chat-messages";
import { SpinnerLinear } from "../../common/spinner/Spinner";
import { Card, IconButton, Stack, TextField, Typography } from "@mui/material";
import ChatHeader from "../../common/chat-header/chat-header";
import EnumChatMessages from "../../enums/enum-chat-messages";
import { AutoFixHigh, Clear, Reply, Send } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { emitMessageCreate, emitMessageUpdate } from "../../../utils/socket/event-emitters/messages";
import { chatsContainerState } from "../chats-container/reactive";
import { chatMessagesContainerState, replyingToNull } from "./reactive";
import { CHATS_USER_RELATED_BY_USER_ID_QUERY } from "../../../utils/graphql-requests/chats";

const reverseDataArray = (arr) => {
    return JSON.parse(JSON.stringify(arr)).reverse()
}

const ChatMessagesContainer = props => {
    const { handleTabSwitch, chat } = props;
    const chatParticipants = chat?.data?.chat.participants.map(i => i._id) || [];
    const [ offset, setOffset ] = useState(0);
    const { user: currentUser } = useReactiveVar(baseState);
    const { selectedChatId } = useReactiveVar(chatsContainerState);
    const { messagesPerLoad, replyingTo, messageText, messages, editingMessageId } = useReactiveVar(chatMessagesContainerState);
    const messgaesContainerRef = useRef();
    const [ fetchChatMessages, { loading: loadingMessages } ] = useLazyQuery(CHAT_MESSAGES_BY_CHAT_ID_QUERY);
    
    // handle msg input
    const handleMessageInput = (e) => {
        chatMessagesContainerState({ ...chatMessagesContainerState(), messageText: e.target.value });
    }

    // cancel replying
    const handleCancelReplying = () => {
        chatMessagesContainerState({ ...chatMessagesContainerState(), replyingTo: replyingToNull });
    }

    // cancel editing
    const handleCancelEditing = () => {
        chatMessagesContainerState({ ...chatMessagesContainerState(), messageText: "", editingMessageId: null });
    }

    // send message click 
    const [ sendMessage ] = useMutation(CHAT_MESSAGE_CREATE_MUTATION);
    const handleSendMessageClick = () => {
        const input = {
            owner: currentUser._id,
            text: messageText,
            chat: selectedChatId,
        };

        if (replyingTo) {
            input.isReply = true;
            input.isReplyTo = replyingTo;
        }

        sendMessage({ 
            variables: { input },
            update: (cache, { data }) => {
                const cachedData = cache.readQuery({ query: CHAT_MESSAGES_BY_CHAT_ID_QUERY, variables: { _id: selectedChatId, offset: 0, limit: messagesPerLoad }});
                const retreivedMessageData = JSON.parse(JSON.stringify(data.chatMessageCreate));
                retreivedMessageData.owner = { _id: currentUser._id, nick: currentUser.nick, avatar: currentUser.avatar };

                cache.writeQuery({
                    query: CHAT_MESSAGES_BY_CHAT_ID_QUERY,  
                    variables: { _id: selectedChatId, offset: 0, limit: messagesPerLoad },
                    data: {
                        chatMessagesByChatId: [retreivedMessageData, ...cachedData.chatMessagesByChatId]
                    }
                });
                const chatMsgsState = chatMessagesContainerState();
                chatMessagesContainerState({...chatMsgsState, messages: [ retreivedMessageData, ...chatMsgsState.messages ]});
            },
            refetchQueries: [{query: CHATS_USER_RELATED_BY_USER_ID_QUERY, variables: { _id: currentUser._id }}]
        }).then(({data}) => {
            emitMessageCreate(data.chatMessageCreate, chatParticipants);
            chatMessagesContainerState({...chatMessagesContainerState(), messageText: ""});
            messgaesContainerRef?.current && (messgaesContainerRef.current.scrollTop = messgaesContainerRef.current.scrollHeight)
        });
    }

    // edit message click
    const [ editMessage ] = useMutation(CHAT_MESSAGE_UPDATE_MUTATION);
    const handleEditMessageClick = () => {
        const input = {
            _id: editingMessageId,
            text: messageText
        }
        editMessage({
            variables: { input },
        }).then(({ data }) => {
            const msgsState = chatMessagesContainerState();
            chatMessagesContainerState({
                ...msgsState, 
                messageText: "", 
                messages: JSON.parse(JSON.stringify(msgsState.messages)).map(i => {
                    if (i._id === data.chatMessageUpdate._id) { i.text = data.chatMessageUpdate.text }
                    return i;
                }),
                editingMessageId: null
            });
            emitMessageUpdate(data.chatMessageUpdate, chatParticipants);
        });
    }

    // effect REF (scroll) on messages container
    useEffect(() => {
        const msgsRef = messgaesContainerRef?.current;

        const handleScroll = (e) => {
            if (messgaesContainerRef?.current.scrollTop === 0) {
                msgsRef?.removeEventListener("scroll", handleScroll);
                msgsRef.style.overflowY = 'hidden'
                setOffset(offset + 1);
                fetchChatMessages({
                    variables: { _id: selectedChatId, offset: (offset + 1) * messagesPerLoad, limit: messagesPerLoad }
                }).then(({data}) => {
                    const msgsContState = chatMessagesContainerState();
                    chatMessagesContainerState({...msgsContState, messages: [...msgsContState.messages, ...data.chatMessagesByChatId]})
                    msgsRef.style.overflowY = 'auto'
                });
            }
        }
        msgsRef?.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            msgsRef?.removeEventListener("scroll", handleScroll);
        }
    });

    // fetch data if chat was selected
    useEffect(() => {
        // check for first load
        if (selectedChatId && offset === 0) {
            fetchChatMessages({
                variables: { _id: selectedChatId, offset, limit: messagesPerLoad }
            }).then(({data}) => {
                const msgsContState = chatMessagesContainerState();
                chatMessagesContainerState({...msgsContState, messages: data.chatMessagesByChatId});
            });
        }
    }, [selectedChatId, fetchChatMessages, messagesPerLoad, offset]);

    // scroll to bottom
    useEffect(() => {
        const msgsRef = messgaesContainerRef?.current;
        if (msgsRef && offset < 1) {
            msgsRef.scrollTop = msgsRef.scrollHeight
        }
    });

    return (
        <>
            {
                (() => {
                    if (currentUser?._id?.length && selectedChatId) {
                        if (chat.loading) {
                            return (<SpinnerLinear/>);
                        }

                        if (chat.data) {
                            return (
                                <Card>
                                    <ChatHeader chat={chat.data.chat} handleClick={(e) => handleTabSwitch(e, 2)} loading={loadingMessages}/>
                                    {
                                        (() => {
                                            if (!messages.length) {
                                                return (
                                                    <Stack sx={{height: {xs: 'calc(100vh - 335px)', md: 'calc(100vh - 347px)'}, p: 2, mt: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}} spacing={3}>
                                                        <Typography>No messages yet</Typography>
                                                    </Stack>
                                                );
                                            }

                                            return (
                                                <Stack ref={messgaesContainerRef} sx={{height: {xs: 'calc(100vh - 335px)', md: 'calc(100vh - 347px)'}, p: 2, mt: 0, overflow: 'auto'}} spacing={3}>
                                                    <EnumChatMessages messages={reverseDataArray(messages)} chatParticipants={chatParticipants}/>
                                                </Stack>
                                            );
                                        })()
                                    }
                                    
                                    <TextField
                                        sx={{px: 0.25}}
                                        fullWidth
                                        id="filled-static"
                                        label={replyingTo.userId ? `Replying to ${replyingTo.userNick}` : "Message"}
                                        variant="outlined"
                                        value={messageText}
                                        onChange={handleMessageInput}
                                        InputProps={{ 
                                            startAdornment: 
                                                editingMessageId
                                                ?
                                                <IconButton onClick={handleCancelEditing}><Clear/></IconButton>
                                                :
                                                replyingTo.userId && <IconButton onClick={handleCancelReplying}><Reply/></IconButton>, 
                                            endAdornment: 
                                                editingMessageId
                                                ?
                                                <IconButton onClick={handleEditMessageClick}><AutoFixHigh/></IconButton>
                                                :
                                                <IconButton onClick={handleSendMessageClick}><Send/></IconButton>
                                        }}
                                    />
                                </Card>
                            );
                        }
                    }
                })()                   
            }
        </>
    );
}


export default ChatMessagesContainer;