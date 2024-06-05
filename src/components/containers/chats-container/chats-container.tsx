import { useEffect, useState } from "react";
import { baseState } from "../../baseReactive";
import { useReactiveVar } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { Avatar, Box, Button, CardContent, CardHeader, Paper, Stack, Tab, Tabs } from "@mui/material";
import { Add, Forum, Info, Send } from "@mui/icons-material";
import TabPanel from "../../common/tab-panel/tab-panel";
import EnumChats from "../../enums/enum-chats";
import { chatCreateModalState } from "../../modals/chat-create-modal/reactive";
import { CHAT_QUERY } from "@/utils/graphql-requests/chats";
import { SpinnerLinear } from "../../common/spinner/Spinner";
import EnumChatParticipants from "../../enums/enum-chat-participants";
import UserImage from "@/assets/icons/logo_person.png"
import ClearImage from "@/assets/icons/logo_clear.png"
import ChatEditForm from "../../forms/chat-edit/chat-edit";
import UserSelectContainer from "../user-select-container/user-select-container";
import { useSnackbar } from "notistack";
import { userSelectContainerState } from "../user-select-container/reactive";
import { chatsContainerState } from "./reactive";
import InfoImage from "../../common/info-image/info-image";
import { emitChatUpdate } from "@/utils/socket/event-emitters/chats";
import ChatMessagesContainer from "../chat-messages-container/chat-messages-container";
import { ChatQuery, useChatLazyQuery, useChatSwitchParticipantsMutation, useChatsUserRelatedByUserIdLazyQuery } from "@/utils/graphql-requests/generated/schema";


export default function ChatsContainer() {
    const [ status, setStatus ] = useState(0);
    const { user: currentUser } = useReactiveVar(baseState);
    const UserSelectContainerState = useReactiveVar(userSelectContainerState);
    const { selectedChatId } = useReactiveVar(chatsContainerState)
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation("containers");


    const [ fetchChats, { data: chatsData, loading: chatsLoading }] = useChatsUserRelatedByUserIdLazyQuery({
        variables: {
            _id: currentUser._id
        }
    });

    const [ fetchSelectedChat, { data: selectedChatData, loading: loadingSelectedChat } ] = useChatLazyQuery({ 
        variables: { 
            _id: selectedChatId as string,
            userId: currentUser._id,
        }
    });
    
    const handleTabSwitch = (_: React.SyntheticEvent<Element, Event>, key: number) => { setStatus(key) }

    // chat select handler
    const chatSelectionHandler = (id: string) => {
        chatsContainerState({ ...chatsContainerState(), selectedChatId: id })
        setStatus(1);
    }

    // open create chat modal
    const handleCreateChatClick = () => {
        chatCreateModalState({ ...chatCreateModalState(), isShowing: true })
    }

    // switch participant handler
    const [ switchParticipants ] = useChatSwitchParticipantsMutation();
    const addOrRemoveParticipants = (participants: { _id: string, __typename: string }[]) => {
        enqueueSnackbar("Updating chat...", { autoHideDuration: 1500 });
        
        switchParticipants({
            variables: { chatId: selectedChatData?.chat._id as string, participants: participants?.map(i => i?._id) as string[] },
            update: (cache, {data}) => {
                const cachedChat = cache.readQuery({
                    query: CHAT_QUERY,
                    variables: { _id: selectedChatId }
                });

                cache.writeQuery({
                    query: CHAT_QUERY,
                    variables: { _id: selectedChatId },
                    data: { ...cachedChat as ChatQuery, participants: data?.chatSwitchParticipants.participants }
                });
            }
        }).then(({data}) => {
            enqueueSnackbar("Chat updated", { autoHideDuration: 1500, variant: 'success' });
            emitChatUpdate(data?.chatSwitchParticipants, participants?.map(i => i?._id));
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
        <Box>
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
                    <Paper sx={{ 
                        borderRadius: '20px', 
                        m: 2, 
                        mb: 0,
                        boxShadow: 5,
                    }}>
                        <Button 
                            startIcon={<Add/>} 
                            sx={{ 
                                boxShadow: 5, 
                                borderRadius: !chatsData?.chatsUserRelatedByUserId?.length ? '20px' : '20px 20px 0 0'
                            }} 
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
                    </Paper>
                    :
                    <InfoImage text="You have to be authenticated"/>
                }
            </TabPanel>
        
            <TabPanel value={status} index={1}>
                <ChatMessagesContainer 
                    handleTabSwitch={handleTabSwitch} 
                    chat={{ 
                        data: selectedChatData as ChatQuery,
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
                                    <Stack sx={{ p: 2, mt: 0, pb: 0 }} spacing={2}>
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
                                                        chatOwnerId={selectedChatData.chat.owner?._id as string}
                                                        participants={selectedChatData.chat.participants}
                                                    />
                                                    <UserSelectContainer except={selectedChatData.chat.participants?.map(i => ({ _id: i?._id as string })) as { _id: string; }[]} includeChats={false}/>
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