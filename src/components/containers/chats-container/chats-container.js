import { useEffect, useRef, useState } from "react";
import { baseState } from "../../baseReactive";
import { useLazyQuery, useMutation, useReactiveVar } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { Avatar, Box, Button, CardContent, CardHeader, IconButton, Paper, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { Add, Forum, Info, Send } from "@mui/icons-material";
import TabPanel from "../../common/tab-panel/tab-panel";
import EnumChats from "../../enums/enum-chats";
import ChatHeader from "../../common/chat-header/chat-header";
import EnumChatMessages from "../../enums/enum-chat-messages";
import { chatCreateModalState } from "../../modals/chat-create-modal/reactive";
import { CHATS_USER_RELATED_BY_USER_ID_QUERY, CHAT_QUERY, CHAT_SWITCH_PARTICIPANT_MUTATION } from "../../../utils/graphql-requests/chats";
import { SpinnerLinear } from "../../common/spinner/Spinner";
import EnumChatParticipants from "../../enums/enum-chat-participants";
import UserImage from "../../../images/icons/logo_person.png"
import ClearImage from "../../../images/icons/logo_clear.png"
import ChatEditForm from "../../forms/chat-edit/chat-edit";
import UserSelectContainer from "../user-select-container/user-select-container";
import { useSnackbar } from "notistack";
import { userSelectContainerState } from "../user-select-container/reactive";
import { CHAT_MESSAGES_BY_CHAT_ID_QUERY, CHAT_MESSAGE_CREATE_MUTATION } from "../../../utils/graphql-requests/chat-messages";
import { chatsContainerState } from "./reactive";
import InfoImage from "../../common/info-image/info-image";
import socket from "../../../utils/socket/socket";


const ChatsContainer = props => {
    const [ status, setStatus ] = useState(0);
    const messgaesContainerRef = useRef();
    const { user: currentUser } = useReactiveVar(baseState);
    const UserSelectContainerState = useReactiveVar(userSelectContainerState);
    const { messageText, replyingTo, selectedChatId, messagesPerLoad } = useReactiveVar(chatsContainerState)
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation("containers");

    
    const [ fetchChats, { data: chatsData, loading: chatsLoading }] = useLazyQuery(CHATS_USER_RELATED_BY_USER_ID_QUERY, {
        variables: {
            _id: currentUser._id,
        }
    });
    const [ fetchSelectedChat, { data: selectedChatData, loading: loadingSelectedChat } ] = useLazyQuery(CHAT_QUERY, {
        variables: {
            _id: selectedChatId,
        }
    });
    const [ fetchChatMessages, { data: chatMessages, loading: loadingMessages } ] = useLazyQuery(CHAT_MESSAGES_BY_CHAT_ID_QUERY, {
        variables: {
            _id: selectedChatId,
            offset: 0,
            limit: messagesPerLoad
        }
    });
    
    const handleTabSwitch = (event, key) => {
        setStatus(key);
    }

    // chat select handler
    const chatSelectionHandler = (id) => {
        chatsContainerState({ ...chatsContainerState(), selectedChatId: id })
        setStatus(1);
    }

    // open create chat modal
    const handleCreateChatClick = () => {
        chatCreateModalState({ ...chatCreateModalState(), isShowing: true })
    }

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

        sendMessage({ variables: { input } }).then(({data}) => {
            console.log(data)
            socket.emit("message create", {
                message: data.chatMessageCreate,
                toUsers: selectedChatData.chat.participants.map(i => i._id)
            });
        });
    }

    // switch participant handler
    const [ switchParticipants ] = useMutation(CHAT_SWITCH_PARTICIPANT_MUTATION);
    const addOrRemoveParticipants = (participants) => {
        enqueueSnackbar("Updating chat...", { autoHideDuration: 1500 });
        
        switchParticipants({
            variables: { chatId: selectedChatData.chat._id, participants: participants.map(i => i._id) },
            update: (cache, {data}) => {
                const cachedChat = cache.readQuery({
                    query: CHAT_QUERY,
                    variables: { _id: selectedChatId }
                });

                cache.writeQuery({
                    query: CHAT_QUERY,
                    variables: { _id: selectedChatId },
                    data: {
                        ...cachedChat, 
                        participants: data.chatSwitchParticipants.participants,
                    }
                });
            }
        }).then(({data}) => {
            enqueueSnackbar("Chat updated", { autoHideDuration: 1500, variant: 'success' });
            socket.emit('chat update', { 
                chat: data.chatSwitchParticipants, 
                toUsers: data.chatSwitchParticipants.participants.map(i => i._id) 
            });
        }).catch(_ => {
            enqueueSnackbar("Can't update this chat", { autoHideDuration: 3000, variant: 'error' });
        });
    }


    // fetch data if chat was selected
    useEffect(() => {
        if (selectedChatId) {
            fetchSelectedChat();
            fetchChatMessages();
        }
    }, [selectedChatId, fetchSelectedChat, fetchChatMessages]);

    // fetch chats if user logged in
    useEffect(() => {
        if (currentUser._id.length) {
            fetchChats();
        }
    }, [currentUser._id, fetchChats]);

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


    return (
        <Box height={'100%'}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 1.2 }}>
                <Tabs value={status} onChange={handleTabSwitch} variant="fullWidth">
                    <Tab icon={<Forum/>} label={t('chats.list')}    id="simple-tab-0" aria-controls="simple-tabpanel-0"/>
                    <Tab icon={<Send/>}  label={t('chats.current')} id="simple-tab-1" aria-controls="simple-tabpanel-1" disabled={!selectedChatId}/>
                    <Tab icon={<Info/>}  label={t('chats.info')}    id="simple-tab-2" aria-controls="simple-tabpanel-2" disabled={!selectedChatId}/>
                </Tabs>
            </Box>

            <TabPanel value={status} index={0}>
                { 
                    currentUser?._id?.length
                    ?
                    <>
                        <Button 
                            startIcon={<Add/>} 
                            sx={{ borderRadius: 0, boxShadow: 5 }} 
                            variant="contained" 
                            fullWidth 
                            onClick={handleCreateChatClick}
                        >
                            {t('chats.create')}
                        </Button>
                        {
                            chatsLoading
                            ?
                            <SpinnerLinear/>
                            :
                            <Box sx={{height: 'calc(100vh - 255px)', overflow: 'auto'}}>
                                <EnumChats chats={chatsData?.chatsUserRelatedByUserId || []} chatSelectionHandler={chatSelectionHandler}/> 
                            </Box>
                        }
                    </>
                    :
                    <InfoImage text="You have to be authenticated"/>
                }
            </TabPanel>
        
            <TabPanel value={status} index={1}>
                { 
                    (() => {
                        if (currentUser?._id?.length && selectedChatId) {
                            if (loadingSelectedChat) {
                                return (<SpinnerLinear/>);
                            }

                            if (selectedChatData) {
                                return (
                                    <Paper>
                                        <ChatHeader 
                                            chat={selectedChatData.chat}
                                            handleClick={(e) => handleTabSwitch(e, 2)}
                                        />
                                        {
                                            (() => {
                                                if (loadingMessages) {
                                                    return (<SpinnerLinear/>);
                                                }

                                                if (!chatMessages.chatMessagesByChatId.length) {
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
            </TabPanel>

            <TabPanel value={status} index={2}>
                { 
                    (() => {
                        if (currentUser?._id?.length && selectedChatId) {
                            if (loadingSelectedChat) {
                                return (<SpinnerLinear/>);
                            }

                            if (selectedChatData) {
                                return (
                                    <Stack sx={{ p: 2, mt: 0 }} spacing={2}>
                                        <Paper sx={{ height: 'fit-content', boxShadow: 10, borderRadius: 5 }}>
                                            <CardContent>
                                                <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center', p: 1}}>
                                                    <Avatar src={ClearImage} alt="Basic info" sx={{ m: 1, boxShadow: 5 }}/>
                                                </Box>
                                                <CardHeader title="Basic info"/>
                                                <ChatEditForm selectedChatId={selectedChatId}/>
                                            </CardContent>
                                        </Paper>
                                        <Paper sx={{ height: 'fit-content', boxShadow: 10, borderRadius: 5 }}>
                                            <CardContent>
                                                <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center', p: 1}}>
                                                    <Avatar src={UserImage} alt="Participants" sx={{ m: 1, boxShadow: 5 }}/>
                                                </Box>
                                                <CardHeader title="Participants"/>
                                                <Stack spacing={2}>
                                                    <EnumChatParticipants
                                                        switchParticipants={addOrRemoveParticipants}
                                                        chatOwnerId={selectedChatData.chat.owner._id}
                                                        participants={selectedChatData.chat.participants}
                                                    />
                                                    <UserSelectContainer except={selectedChatData.chat.participants}/>
                                                    <Button
                                                        variant="contained" 
                                                        sx={{ boxShadow: 10 }}
                                                        onClick={() => addOrRemoveParticipants(UserSelectContainerState.checked)}
                                                    >
                                                        Add participants
                                                    </Button>
                                                </Stack>
                                            </CardContent>
                                        </Paper>
                                    </Stack>
                                );
                            }
                        }
                    })()                   
                }
            </TabPanel>
        </Box>
    );
}


export default ChatsContainer;