import { useMutation, useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { CHAT_MESSAGES_BY_CHAT_ID_QUERY, CHAT_MESSAGE_CREATE_MUTATION, CHAT_MESSAGE_UPDATE_MUTATION } from "utils/graphql-requests/chat-messages";
import { SpinnerLinear } from "../../common/spinner/Spinner";
import { Card, IconButton, Stack, TextField, Typography } from "@mui/material";
import ChatHeader from "../../common/chat-header/chat-header";
import { AutoFixHigh, Clear, Reply, Send } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { emitMessageCreate, emitMessageDelete, emitMessageUpdate } from "utils/socket/event-emitters/messages";
import { chatsContainerState } from "../chats-container/reactive";
import { TSendMessage, chatMessagesContainerState, replyingToNull } from "./reactive";
import { CHATS_USER_RELATED_BY_USER_ID_QUERY, CHAT_READ_ALL_MESSAGES_MUTATION } from "utils/graphql-requests/chats";
import socket from "utils/socket/socket";
import client from "utils/apollo/client";
import { MessageList, MessageListEvent } from "react-chat-elements"
import { useNavigate } from "react-router-dom"
import { ChatMessage, ChatQuery, ChatMessagesByChatIdQuery, useChatMessagesByChatIdQuery, useChatMessageDeleteByIdMutation } from "utils/graphql-requests/generated/schema";


const reverseDataArray = (arr: unknown[]) => {
    return JSON.parse(JSON.stringify(arr)).reverse()
}

export default function ChatMessagesContainer(props: {
    handleTabSwitch: (event: React.SyntheticEvent<Element, Event>, key: number) => void;
    chat: {
        data: ChatQuery,
        loading: boolean,
    };
}) {
    const { handleTabSwitch, chat } = props;
    console.log(chat)
    const chatParticipants = chat?.data?.chat?.participants?.map(i => i?._id) || [];
    const navigate = useNavigate();
    const [ offset, setOffset ] = useState(0);
    const [ firstLoad, setFirstLoad ] = useState(true);
    const { user: currentUser, locations } = useReactiveVar(baseState);
    const { selectedChatId } = useReactiveVar(chatsContainerState);
    const { messagesPerLoad, replyingTo, messageText, editingMessageId } = useReactiveVar(chatMessagesContainerState);
    const messagesContainerRef = useRef<HTMLDivElement>();

    const { data: messages, loading: loadingMessages, fetchMore: fetchMoreMessages } = useChatMessagesByChatIdQuery({
        variables: {
            _id: selectedChatId as string,
            offset: 0,
            limit: messagesPerLoad
        }
    })
    
    // handle msg input
    const handleMessageInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    // navigate to user profile
    const navigateToUserProfile = (msg: ChatMessage) => {
        navigate(`/app/profile/${msg.owner._id}`);
    }

    // handle message edit
    const handleMessageEdit = (msg: ChatMessage, e: MessageListEvent) => {
        chatMessagesContainerState({ ...chatMessagesContainerState(), messageText: msg.text as string, editingMessageId: msg._id, replyingTo: replyingToNull });
    }

    // handle message reply
    const handleMessageReply = (msg: ChatMessage) => {
        chatMessagesContainerState({...chatMessagesContainerState(), replyingTo: {
            messageId: msg._id,
            userId: msg.owner._id,
            userNick: msg.owner.nick,
        }, messageText: "", editingMessageId: null});
    }

    // send message click 
    const [ sendMessage ] = useMutation(CHAT_MESSAGE_CREATE_MUTATION);
    const handleSendMessageClick = () => {
        const input: TSendMessage = {
            owner: currentUser._id,
            text: messageText,
            chat: selectedChatId as unknown as string,
            type: "text",
        };

        if (replyingTo.messageId) { 
            input.reply = replyingTo.messageId; 
        }


        sendMessage({ 
            variables: { input },
            update: (cache, { data }) => {
                const cachedData: ChatMessagesByChatIdQuery | null = cache.readQuery({ query: CHAT_MESSAGES_BY_CHAT_ID_QUERY, variables: { _id: selectedChatId, offset: 0, limit: messagesPerLoad }});
                const retreivedMessageData = JSON.parse(JSON.stringify(data.chatMessageCreate));
                retreivedMessageData.owner = { _id: currentUser._id, nick: currentUser.nick, avatar: currentUser.avatar };

                //console.log("RDATA: ", retreivedMessageData)
                cache.writeQuery({
                    query: CHAT_MESSAGES_BY_CHAT_ID_QUERY,  
                    variables: { _id: selectedChatId, offset: 0, limit: messagesPerLoad },
                    data: {
                        chatMessagesByChatId: [retreivedMessageData, ...cachedData?.chatMessagesByChatId as ChatMessagesByChatIdQuery[]]
                    }
                });
            },
            refetchQueries: [{query: CHATS_USER_RELATED_BY_USER_ID_QUERY, variables: { _id: currentUser._id }}]
        }).then(({data}) => {
            emitMessageCreate(data.chatMessageCreate, chatParticipants);
            chatMessagesContainerState({...chatMessagesContainerState(), messageText: ""});
            messagesContainerRef?.current && (messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight)
        });
    }

    // delete message
    const [ deleteMsg ] = useChatMessageDeleteByIdMutation();
    const handleDelete = (msg: ChatMessage) => {
        deleteMsg({
            variables: { _id: msg._id },
            update: (cache, {data}) => {
                const msgs = JSON.parse(JSON.stringify(cache.readQuery({
                    query: CHAT_MESSAGES_BY_CHAT_ID_QUERY, 
                    variables: {
                        _id: selectedChatId, offset: 0, limit: messagesPerLoad
                    }
                }))) as ChatMessagesByChatIdQuery;

                cache.writeQuery({
                    query: CHAT_MESSAGES_BY_CHAT_ID_QUERY, 
                    variables: {
                        _id: selectedChatId, offset: 0, limit: messagesPerLoad
                    },
                    data: {
                        chatMessagesByChatId: msgs.chatMessagesByChatId?.filter(i => i._id !== data?.chatMessageDeleteById._id)
                    }
                });
            }
        }).then(({data}) => {
            emitMessageDelete(data?.chatMessageDeleteById, chatParticipants);
        });
    }
       
    // edit message click
    const [ editMessage ] = useMutation(CHAT_MESSAGE_UPDATE_MUTATION);
    const handleEditMessageConfirmClick = () => {
        const input = {
            _id: editingMessageId,
            text: messageText
        }
        editMessage({
            variables: { input },
            update: (cache) => {
                const msgs = JSON.parse(JSON.stringify(cache.readQuery({
                    query: CHAT_MESSAGES_BY_CHAT_ID_QUERY, 
                    variables: {
                        _id: selectedChatId, offset: 0, limit: messagesPerLoad
                    }
                }))) as ChatMessagesByChatIdQuery;
    
                cache.writeQuery({
                    query: CHAT_MESSAGES_BY_CHAT_ID_QUERY, 
                    variables: {
                        _id: selectedChatId, offset: 0, limit: messagesPerLoad
                    },
                    data: {
                        chatMessagesByChatId: msgs.chatMessagesByChatId?.map(i => {
                            if (i._id === editingMessageId) { i.text = messageText; }
                            return i;
                        })
                    }
                });
            }
        }).then(({ data }) => {
            chatMessagesContainerState({...chatMessagesContainerState(), messageText: "", editingMessageId: null });
            emitMessageUpdate(data.chatMessageUpdate, chatParticipants);
        });
    }

    // effect REF (scroll) on messages container
    const [ readAllMessages ] = useMutation(CHAT_READ_ALL_MESSAGES_MUTATION, { variables: { chatId: selectedChatId, userId: currentUser._id } });
    useEffect(() => {
        const msgsRef = messagesContainerRef?.current;
        const handleScroll = (e: Event) => {
            if (messagesContainerRef?.current?.scrollTop === 0) {
                msgsRef?.removeEventListener("scroll", handleScroll);
                setOffset(offset + 1);
                fetchMoreMessages({
                    variables: {offset: messages?.chatMessagesByChatId?.length}, 
                    updateQuery(prev, { fetchMoreResult }) {
                        if (!fetchMoreResult) return prev;
                        return Object.assign({}, prev, {
                            chatMessagesByChatId: [...prev.chatMessagesByChatId as ChatMessagesByChatIdQuery[] , ...fetchMoreResult.chatMessagesByChatId as ChatMessagesByChatIdQuery[]]
                        });
                    }
                }).then(({data}) => {
                    data?.chatMessagesByChatId?.length && (msgsRef!.scrollTop = msgsRef?.offsetHeight as number);
                });
            }
            if (msgsRef?.scrollTop === (msgsRef?.scrollHeight as number) - (msgsRef?.offsetHeight as number) && !firstLoad) {
                // fetch 
                readAllMessages();
            }
        }
        msgsRef?.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            msgsRef?.removeEventListener("scroll", handleScroll);
        }
    });


    // scroll to bottom
    useEffect(() => {
        const msgsRef = messagesContainerRef?.current;
        if (msgsRef && offset < 1) {
            msgsRef.scrollTop = msgsRef.scrollHeight
        }
    });

    // react on socket
    useEffect(() => {
        setFirstLoad(false);
        // messages query
        const queryDefinition = {
            query: CHAT_MESSAGES_BY_CHAT_ID_QUERY,  
            variables: { _id: selectedChatId, offset: 0, limit: messagesPerLoad },
        }

        // function to read query from cache
        const readMsgsQuery = (): ChatMessagesByChatIdQuery => {
            return JSON.parse(JSON.stringify(client.cache.readQuery(queryDefinition)));
        }

        socket.on('message create', async(socketData) => {
            if (socketData.owner._id !== currentUser._id) {
                    const cachedData = readMsgsQuery();
                if (socketData.isReply) {
                    console.log('TODO: parse reply msg!')
                } else {
                    client.cache.writeQuery({
                        ...queryDefinition,
                        data: { chatMessagesByChatId: [socketData, ...cachedData.chatMessagesByChatId as ChatMessagesByChatIdQuery[]] }
                    });
                }
            }
        });
        socket.on('message update', async(socketData) => {
            if (socketData.owner._id !== currentUser._id) {
                const cachedData = readMsgsQuery();
                client.cache.writeQuery({
                    ...queryDefinition,
                    data: { 
                        chatMessagesByChatId: cachedData.chatMessagesByChatId?.map(i => {
                            i._id === socketData._id && (i.text = socketData.text);
                            return i;
                        })
                    }
                });
            }
        });
        socket.on('message delete', async(socketData) => {
            if (socketData.owner._id !== currentUser._id) {
                const cachedData = readMsgsQuery();
                client.cache.writeQuery({
                    ...queryDefinition,
                    data: { chatMessagesByChatId: cachedData.chatMessagesByChatId?.filter(i => i._id !== socketData._id) }
                });
            }
        });
        return () => {
            socket.off('message create').off('message update').off('message delete');
        }
    }, [setFirstLoad,currentUser._id, messagesPerLoad, selectedChatId]);

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
                                    <ChatHeader chat={chat.data.chat} handleClick={(e: React.MouseEvent<HTMLDivElement>) => handleTabSwitch(e, 2)} loading={loadingMessages}/>
                                    {
                                        (() => {
                                            if (!messages?.chatMessagesByChatId?.length || loadingMessages) {
                                                return (
                                                    <Stack sx={{height: {xs: 'calc(100vh - 335px)', md: 'calc(100vh - 347px)'}, p: 2, mt: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}} spacing={3}>
                                                        <Typography>No messages yet</Typography>
                                                    </Stack>
                                                );
                                            }

                                            return (
                                                <Stack ref={messagesContainerRef as unknown as React.RefObject<HTMLDivElement>} sx={{height: {xs: 'calc(100vh - 335px)', md: 'calc(100vh - 347px)'}, p: 2, mt: 0, overflow: 'auto'}} spacing={3}>
                                                    { /* @ts-ignore */ }
                                                    <MessageList
                                                        className='message-list'
                                                        lockable={true}
                                                        toBottomHeight={'100%'}
                                                        dataSource={
                                                            reverseDataArray(messages.chatMessagesByChatId).map((msg: any) => {
                                                                let message = {
                                                                    id: msg._id,
                                                                    position: currentUser._id === msg.owner._id ? 'right' : 'left',
                                                                    type: msg.type || 'text',
                                                                    title: msg.owner.nick,
                                                                    owner: msg.owner,
                                                                    avatar: msg.owner.avatar?.length ? `${locations.images}/${msg.owner.avatar}` : null,
                                                                    text: msg.text,
                                                                    date: msg.createdAt,
                                                                    replyButton: true,
                                                                    removeButton: currentUser._id === msg.owner._id,
                                                                }
                                                                
                                                                if (msg?.reply) {
                                                                    { /* @ts-ignore */ }
                                                                    message.reply = {
                                                                        message: msg?.reply.text,
                                                                        title: msg?.reply.owner.nick
                                                                    }
                                                                }

                                                                if (msg.tupe === 'spotify') {
                                                                    { /* @ts-ignore */ }
                                                                    message.theme = 'dark';
                                                                    { /* @ts-ignore */ }
                                                                    message.view = 'coverart';
                                                                    { /* @ts-ignore */ }
                                                                    message.uri = 'https://open.spotify.com/playlist/0Gvl5v7YRRMF03akVGT8pN?si=3d6ff4c10e984208'
                                                                }

                                                                if (msg.type === 'image') {
                                                                    msg.data = {
                                                                        uri: 'none',
                                                                        width: 100,
                                                                        height: 100,
                                                                        alt: 'image'
                                                                    }
                                                                }

                                                                return message
                                                            })
                                                        }
                                                        onTitleClick={navigateToUserProfile}
                                                        onReplyClick={handleMessageReply}
                                                        onRemoveMessageClick={handleDelete}
                                                        onContextMenu={handleMessageEdit}
                                                    />
                                                </Stack>
                                            );
                                        })()
                                    }
                                    
                                    <TextField
                                        sx={{px: 0.25}}
                                        fullWidth
                                        id="filled-static"
                                        label={
                                            (() => {
                                                if (editingMessageId) return "Editing message"
                                                if (replyingTo.userId) return `Replying to ${replyingTo.userNick}`
                                                return "Message"
                                            })()
                                        }
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
                                                <IconButton onClick={handleEditMessageConfirmClick}><AutoFixHigh/></IconButton>
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
