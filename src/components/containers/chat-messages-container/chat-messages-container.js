import { useLazyQuery, useMutation, useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { CHAT_MESSAGES_BY_CHAT_ID_QUERY, CHAT_MESSAGE_CREATE_MUTATION } from "../../../utils/graphql-requests/chat-messages";
import { SpinnerLinear } from "../../common/spinner/Spinner";
import { IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import ChatHeader from "../../common/chat-header/chat-header";
import EnumChatMessages from "../../enums/enum-chat-messages";
import { Send } from "@mui/icons-material";
import { useEffect, useRef } from "react";
import { emitMessageCreate } from "../../../utils/socket/event-emitters/messages";
import { chatsContainerState } from "../chats-container/reactive";


const ChatMessagesContainer = props => {
    const { handleTabSwitch, chat } = props;
    const { user: currentUser } = useReactiveVar(baseState);
    const { messageText, replyingTo, selectedChatId, messagesPerLoad } = useReactiveVar(chatsContainerState);
    const messgaesContainerRef = useRef();
    const [ fetchChatMessages, { data: chatMessages, loading: loadingMessages } ] = useLazyQuery(CHAT_MESSAGES_BY_CHAT_ID_QUERY, { variables: { _id: selectedChatId, offset: 0, limit: messagesPerLoad }});
    // handle msg input
    const handleMessageInput = (e) => {
        chatsContainerState({ ...chatsContainerState(), messageText: e.target.value })
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
                const cachedData = cache.readQuery({ 
                    query: CHAT_MESSAGES_BY_CHAT_ID_QUERY,  
                    variables: { _id: selectedChatId, offset: 0, limit: messagesPerLoad }
                });

                const retreivedMessageData = JSON.parse(JSON.stringify(data.chatMessageCreate));
                retreivedMessageData.owner = {
                    _id: currentUser._id,
                    nick: currentUser.nick,
                    avatar: currentUser.avatar
                };

                cache.writeQuery({
                    query: CHAT_MESSAGES_BY_CHAT_ID_QUERY,  
                    variables: { _id: selectedChatId, offset: 0, limit: messagesPerLoad },
                    data: {
                        chatMessagesByChatId: [...cachedData.chatMessagesByChatId, retreivedMessageData]
                    }
                });
            }
        }).then(({data}) => {
            console.log(data)
            emitMessageCreate(data.chatMessageCreate, chat.data.chat.participants.map(i => i._id));
        });
    }

    // effect REF (scroll) on messages container
    useEffect(() => {
        const msgsRef = messgaesContainerRef?.current;
        if (msgsRef) {
            msgsRef.scrollTop = msgsRef.scrollHeight
        }

        const handleScroll = (e) => {
            console.log("oY offset", messgaesContainerRef?.current.scrollTop);
            if (messgaesContainerRef?.current.scrollTop === 0) {
                console.log("FETCH OLD MESSAGES!")
                msgsRef?.removeEventListener("scroll", handleScroll);
            } 
            /*
            else if (messgaesContainerRef?.current.scrollTop > messgaesContainerRef?.current.offsetHeight) {
                console.log("FETCH NEW MESSAGES!")
                msgsRef?.removeEventListener("scroll", handleScroll);
            }
            */
        }
        msgsRef?.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            msgsRef?.removeEventListener("scroll", handleScroll);
        }
    });

    // fetch data if chat was selected
    useEffect(() => {
        if (selectedChatId) {
            fetchChatMessages();
        }
    }, [selectedChatId, fetchChatMessages]);

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
                                <Paper>
                                    <ChatHeader 
                                        chat={chat.data.chat}
                                        handleClick={(e) => handleTabSwitch(e, 2)}
                                    />
                                    {
                                        (() => {
                                            if (loadingMessages) {
                                                return (<SpinnerLinear/>);
                                            }

                                            if (!chatMessages?.chatMessagesByChatId.length) {
                                                return (
                                                    <Stack sx={{height: {xs: 'calc(100vh - 335px)', md: 'calc(100vh - 347px)'}, p: 2, mt: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}} spacing={3}>
                                                        <Typography>No messages yet</Typography>
                                                    </Stack>
                                                );
                                            }

                                            return (
                                                <Stack ref={messgaesContainerRef} sx={{height: {xs: 'calc(100vh - 335px)', md: 'calc(100vh - 347px)'}, p: 2, mt: 0, overflow: 'auto'}} spacing={3}>
                                                    <EnumChatMessages messages={chatMessages.chatMessagesByChatId}/>
                                                </Stack>
                                            );
                                        })()
                                    }
                                    <Paper sx={{borderRadius: 0}}>
                                        <TextField
                                            fullWidth
                                            id="filled-static"
                                            label="Message"
                                            variant="filled"
                                            onChange={handleMessageInput}
                                            InputProps={{ 
                                                disableUnderline: true, 
                                                endAdornment: <IconButton onClick={handleSendMessageClick}><Send/></IconButton>
                                            }}
                                        />
                                    </Paper>
                                </Paper>
                            );
                        }
                    }
                })()                   
            }
        </>
    );
}


export default ChatMessagesContainer;