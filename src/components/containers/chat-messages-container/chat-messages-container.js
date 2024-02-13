import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { CHAT_MESSAGES_BY_CHAT_ID_QUERY, CHAT_MESSAGE_CREATE_MUTATION, CHAT_MESSAGE_DELETE_BY_ID_MUTATION, CHAT_MESSAGE_UPDATE_MUTATION } from "../../../utils/graphql-requests/chat-messages";
import { SpinnerLinear } from "../../common/spinner/Spinner";
import { Card, IconButton, Stack, TextField, Typography } from "@mui/material";
import ChatHeader from "../../common/chat-header/chat-header";
import { AutoFixHigh, Clear, Reply, Send } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { emitMessageCreate, emitMessageDelete, emitMessageUpdate } from "../../../utils/socket/event-emitters/messages";
import { chatsContainerState } from "../chats-container/reactive";
import { chatMessagesContainerState, replyingToNull } from "./reactive";
import { CHATS_USER_RELATED_BY_USER_ID_QUERY } from "../../../utils/graphql-requests/chats";
import socket from "../../../utils/socket/socket";
import client from "../../../utils/apollo/client";
import { MessageList } from "react-chat-elements"
import { useNavigate } from "react-router-dom"


const reverseDataArray = (arr) => {
    return JSON.parse(JSON.stringify(arr)).reverse()
}

const parseMessages = (retreivedMessageData, cachedData) => {
    return [retreivedMessageData, ...cachedData]
}

const ChatMessagesContainer = props => {
    const { handleTabSwitch, chat } = props;
    const chatParticipants = chat?.data?.chat.participants.map(i => i._id) || [];
    const navigate = useNavigate();
    const [ offset, setOffset ] = useState(0);
    const { user: currentUser } = useReactiveVar(baseState);
    const { selectedChatId } = useReactiveVar(chatsContainerState);
    const { messagesPerLoad, replyingTo, messageText, editingMessageId } = useReactiveVar(chatMessagesContainerState);
    const messgaesContainerRef = useRef();
    const { data: messages, loading: loadingMessages, fetchMore: fetchMoreMessages } = useQuery(CHAT_MESSAGES_BY_CHAT_ID_QUERY, {
        variables: {
            _id: selectedChatId, offset: 0, limit: messagesPerLoad
        },
    });
    
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

    // navigate to user profile
    const navigateToUserProfile = (msg) => {
        navigate(`/app/profile/${msg.owner_id}`);
    }

    // handle message edit
    const handleMessageEdit = (msg, index, e) => {
        e.preventDefault();
        chatMessagesContainerState({ ...chatMessagesContainerState(), messageText: msg.text, editingMessageId: msg.id, replyingTo: replyingToNull });
    }

    // handle message reply
    const handleMessageReply = (msg) => {
        chatMessagesContainerState({...chatMessagesContainerState(), replyingTo: {
            messageId: msg.id,
            userId: msg.owner._id,
            userNick: msg.owner.nick,
        }, messageText: "", editingMessageId: null});
    }

    // send message click 
    const [ sendMessage ] = useMutation(CHAT_MESSAGE_CREATE_MUTATION);
    const handleSendMessageClick = () => {
        const input = {
            owner: currentUser._id,
            text: messageText,
            chat: selectedChatId,
        };

        if (replyingTo.messageId) { 
            input.reply = replyingTo.messageId; 
        }

        console.log(replyingTo.messageId, input)

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
                        chatMessagesByChatId: parseMessages(retreivedMessageData, cachedData.chatMessagesByChatId)
                    }
                });
            },
            refetchQueries: [{query: CHATS_USER_RELATED_BY_USER_ID_QUERY, variables: { _id: currentUser._id }}]
        }).then(({data}) => {
            emitMessageCreate(data.chatMessageCreate, chatParticipants);
            chatMessagesContainerState({...chatMessagesContainerState(), messageText: ""});
            messgaesContainerRef?.current && (messgaesContainerRef.current.scrollTop = messgaesContainerRef.current.scrollHeight)
        });
    }

    // delete message
    const [ deleteMsg ] = useMutation(CHAT_MESSAGE_DELETE_BY_ID_MUTATION);
    const handleDelete = (msg) => {
        deleteMsg({
            variables: { _id: msg.id },
            update: (cache, {data}) => {
                const msgs = JSON.parse(JSON.stringify(cache.readQuery({
                    query: CHAT_MESSAGES_BY_CHAT_ID_QUERY, 
                    variables: {
                        _id: selectedChatId, offset: 0, limit: messagesPerLoad
                    }
                })));

                cache.writeQuery({
                    query: CHAT_MESSAGES_BY_CHAT_ID_QUERY, 
                    variables: {
                        _id: selectedChatId, offset: 0, limit: messagesPerLoad
                    },
                    data: {
                        chatMessagesByChatId: msgs.chatMessagesByChatId.filter(i => i._id !== data.chatMessageDeleteById._id)
                    }
                });
            }
        }).then(({data}) => {
            emitMessageDelete(data.chatMessageDeleteById, chatParticipants);
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
                })));
    
                cache.writeQuery({
                    query: CHAT_MESSAGES_BY_CHAT_ID_QUERY, 
                    variables: {
                        _id: selectedChatId, offset: 0, limit: messagesPerLoad
                    },
                    data: {
                        chatMessagesByChatId: msgs.chatMessagesByChatId.map(i => {
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
    useEffect(() => {
        const msgsRef = messgaesContainerRef?.current;
        const handleScroll = (e) => {
            if (messgaesContainerRef?.current.scrollTop === 0) {
                msgsRef?.removeEventListener("scroll", handleScroll);
                //msgsRef.style.overflowY = 'hidden'
                setOffset(offset + 1);
                fetchMoreMessages({
                    variables: {offset: messages.chatMessagesByChatId.length}, 
                    updateQuery(prev, { fetchMoreResult }) {
                        if (!fetchMoreResult) return prev;
                        return Object.assign({}, prev, {
                            chatMessagesByChatId: [...prev.chatMessagesByChatId, ...fetchMoreResult.chatMessagesByChatId]
                        });
                    }
                }).then(({data}) => {
                    data.chatMessagesByChatId.length && (messgaesContainerRef.current.scrollTop = messgaesContainerRef.current.offsetHeight);
                });
            }
        }
        msgsRef?.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            msgsRef?.removeEventListener("scroll", handleScroll);
        }
    });


    // scroll to bottom
    useEffect(() => {
        const msgsRef = messgaesContainerRef?.current;
        if (msgsRef && offset < 1) {
            msgsRef.scrollTop = msgsRef.scrollHeight
        }
    });

    // react on socket
    useEffect(() => {
        // function to read query from cache
        const readMsgsQuery = () => {
            return JSON.parse(JSON.stringify(client.cache.readQuery({
                query: CHAT_MESSAGES_BY_CHAT_ID_QUERY, 
                variables: { _id: selectedChatId, offset: 0, limit: messagesPerLoad }
            })));
        }

        // messages query
        const queryDefinition = {
            query: CHAT_MESSAGES_BY_CHAT_ID_QUERY,  
            variables: { _id: selectedChatId, offset: 0, limit: messagesPerLoad },
        }

        socket.on('message create', async(socketData) => {
            if (socketData.owner._id !== currentUser._id) {
                    const cachedData = readMsgsQuery();
                if (socketData.isReply) {
                    console.log('TODO: parse reply msg!')
                } else {
                    client.cache.writeQuery({
                        ...queryDefinition,
                        data: { chatMessagesByChatId: [socketData, ...cachedData.chatMessagesByChatId] }
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
                        chatMessagesByChatId: cachedData.chatMessagesByChatId.map(i => {
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
                    data: { chatMessagesByChatId: cachedData.chatMessagesByChatId.filter(i => i._id !== socketData._id) }
                });
            }
        });
        return () => {
            socket.off('message create').off('message update').off('message delete');
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
                                            if (!messages?.chatMessagesByChatId.length || loadingMessages) {
                                                return (
                                                    <Stack sx={{height: {xs: 'calc(100vh - 335px)', md: 'calc(100vh - 347px)'}, p: 2, mt: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}} spacing={3}>
                                                        <Typography>No messages yet</Typography>
                                                    </Stack>
                                                );
                                            }

                                            return (
                                                <Stack ref={messgaesContainerRef} sx={{height: {xs: 'calc(100vh - 335px)', md: 'calc(100vh - 347px)'}, p: 2, mt: 0, overflow: 'auto'}} spacing={3}>
                                                    <MessageList
                                                        className='message-list'
                                                        lockable={true}
                                                        toBottomHeight={'100%'}
                                                        dataSource={
                                                            reverseDataArray(messages.chatMessagesByChatId).map(msg => {
                                                                let message = {
                                                                    id: msg._id,
                                                                    position: currentUser._id === msg.owner._id ? 'right' : 'left',
                                                                    type: 'text',
                                                                    title: msg.owner.nick,
                                                                    owner: msg.owner,
                                                                    text: msg.text,
                                                                    date: msg.createdAt,
                                                                    replyButton: true,
                                                                    removeButton: currentUser._id === msg.owner._id,
                                                                }
                                                                
                                                                if (msg?.reply) {
                                                                    message.reply = {
                                                                        message: msg?.reply.text,
                                                                        title: msg?.reply.owner.nick
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


export default ChatMessagesContainer;