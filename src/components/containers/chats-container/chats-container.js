import { useEffect, useState } from "react";
import { baseState } from "../../baseReactive";
import { useLazyQuery, useMutation, useReactiveVar } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { Avatar, Box, Button, CardContent, CardHeader, Paper, Stack, Tab, Tabs } from "@mui/material";
import { Add, Forum, Info, Send } from "@mui/icons-material";
import TabPanel from "../../common/tab-panel/tab-panel";
import EnumChats from "../../enums/enum-chats";
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
import { chatsContainerState } from "./reactive";
import InfoImage from "../../common/info-image/info-image";
import { emitChatUpdate } from "../../../utils/socket/event-emitters/chats";
import ChatMessagesContainer from "../chat-messages-container/chat-messages-container";


const ChatsContainer = props => {
    const [ status, setStatus ] = useState(0);
    const { user: currentUser } = useReactiveVar(baseState);
    const UserSelectContainerState = useReactiveVar(userSelectContainerState);
    const { selectedChatId } = useReactiveVar(chatsContainerState)
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation("containers");

    
    const [ fetchChats, { data: chatsData, loading: chatsLoading }] = useLazyQuery(CHATS_USER_RELATED_BY_USER_ID_QUERY, { 
        variables: { 
            _id: currentUser._id 
        }
    });
    const [ fetchSelectedChat, { data: selectedChatData, loading: loadingSelectedChat } ] = useLazyQuery(CHAT_QUERY, { 
        variables: { 
            _id: selectedChatId,
            userId: currentUser._id,
        }
    });
    
    const handleTabSwitch = (event, key) => { setStatus(key) }

    // chat select handler
    const chatSelectionHandler = (id) => {
        chatsContainerState({ ...chatsContainerState(), selectedChatId: id })
        setStatus(1);
    }

    // open create chat modal
    const handleCreateChatClick = () => {
        chatCreateModalState({ ...chatCreateModalState(), isShowing: true })
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
                    data: { ...cachedChat, participants: data.chatSwitchParticipants.participants }
                });
            }
        }).then(({data}) => {
            enqueueSnackbar("Chat updated", { autoHideDuration: 1500, variant: 'success' });
            emitChatUpdate(data.chatSwitchParticipants, participants.map(i => i._id));
        }).catch(_ => {
            enqueueSnackbar("Can't update this chat", { autoHideDuration: 3000, variant: 'error' });
        });
    }

    // fetch data if chat was selected
    useEffect(() => {
        if (selectedChatId) {
            fetchSelectedChat();
        }
    }, [selectedChatId, fetchSelectedChat]);

    // fetch chats if user logged in
    useEffect(() => {
        if (currentUser._id.length) {
            fetchChats();
        }
    }, [currentUser._id, fetchChats]);


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
                            color="secondary" 
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
                <ChatMessagesContainer 
                    handleTabSwitch={handleTabSwitch} 
                    chat={{ 
                        data: selectedChatData,
                        loading: loadingSelectedChat,
                    }}
                />
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
                                                        color="secondary"
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