import { useEffect, useState } from "react";
import { baseState } from "../../baseReactive";
import { useLazyQuery, useQuery, useReactiveVar } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { Avatar, Box, Button, CardContent, CardHeader, IconButton, Paper, Stack, Tab, Tabs, TextField } from "@mui/material";
import { Add, Forum, Info, Send } from "@mui/icons-material";
import TabPanel from "../../common/tab-panel/tab-panel";
import EnumChats from "../../enums/enum-chats";
import ChatHeader from "../../common/chat-header/chat-header";
import EnumChatMessages from "../../enums/enum-chat-messages";
import { chatCreateModalState } from "../../modals/chat-create-modal/reactive";
import { CHATS_USER_RELATED_BY_USER_ID_QUERY, CHAT_QUERY } from "../../../utils/graphql-requests/chats";
import { SpinnerLinear } from "../../common/spinner/Spinner";
import EnumChatParticipants from "../../enums/enum-chat-participants";
import UserImage from "../../../images/icons/logo_person.png"
import ClearImage from "../../../images/icons/logo_clear.png"
import ChatEditForm from "../../forms/chat-edit/chat-edit";

const ChatsContainer = props => {
    const [ status, setStatus ] = useState(0);
    const [ selectedChatId, setSelectedChatId ] = useState(null);
    const { user: currentUser } = useReactiveVar(baseState);
    const { t } = useTranslation("containers");
    const { data: chatsData, loading: chatsLoading } = useQuery(CHATS_USER_RELATED_BY_USER_ID_QUERY, {
        variables: {
            _id: currentUser._id,
        }
    });
    const [ fetchSelectedChat, { data: selectedChatData, loading: loadingSelectedChat } ] = useLazyQuery(CHAT_QUERY, {
        variables: {
            _id: selectedChatId,
        }
    });

    const msgs = [
        { _id: 1, owner: { _id: currentUser._id, avatar: "NULL", nick: "profileNick", text: "tadawdwadwatadawdwadwadadadwadadexttadawdwadwadadadwadadexttadawdwadwadadadwadadexttadawdwadwadadadwadadexttadawdwadwadadadwadadexttadawdwadwadadadwadadexttadawdwadwadadadwadadextdadadwadadext" } },
        { _id: 2, owner: { _id: 'a', avatar: "NULL", nick: "profileNick", text: "tadawdwadwadadadwadadext" }},
        { _id: 3, owner: { _id: 'a', avatar: "NULL", nick: "profileNick", text: "tadawdwadwadadadwadadext" }},
        { _id: 4, owner: { _id: 'a', avatar: "NULL", nick: "profileNick", text: "tadawdwadwadadadwadadext" }},
        { _id: 5, owner: { _id: 'a', avatar: "NULL", nick: "profileNick", text: "tadawdw" }},
        { _id: 6, owner: { _id: currentUser._id, avatar: "NULL", nick: "profileNick", text: "tadawdw" }},
        { _id: 7, owner: { _id: 'a', avatar: "NULL", nick: "profileNick", text: "tadawdw" }},
        { _id: 8, owner: { _id: 'a', avatar: "NULL", nick: "profileNick", text: "tadawdw" }},
        { _id: 9, owner: { _id: currentUser._id, avatar: "NULL", nick: "profileNick", text: "tadawdw" }},
    ];

    
    const handleTabSwitch = (event, key) => {
        setStatus(key);
    }

    // chat select handler
    const chatSelectionHandler = (id) => {
        setSelectedChatId(id);
        setStatus(1);
    }

    // open create chat modal
    const handleCreateChatClick = () => {
        chatCreateModalState({ ...chatCreateModalState(), isShowing: true })
    }

    // fetch data if chat was selected
    useEffect(() => {
        if (selectedChatId) {
            fetchSelectedChat();
        }
    }, [selectedChatId, fetchSelectedChat]);


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
                    && 
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
                                <EnumChats chats={chatsData.chatsUserRelatedByUserId} chatSelectionHandler={chatSelectionHandler}/> 
                            </Box>
                        }
                    </>
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
                                        <ChatHeader handleClick={(e) => handleTabSwitch(e, 2)}/>
                                        <Stack sx={{height: 'calc(100vh - 347px)', p: 2, mt: 0, overflow: 'auto'}} spacing={3}>
                                            <EnumChatMessages messages={msgs}/>
                                        </Stack>
                                        <Paper sx={{borderRadius: 0}}>
                                            <TextField
                                                fullWidth
                                                id="filled-static"
                                                label="Message"
                                                variant="filled"
                                                InputProps={{ 
                                                    disableUnderline: true, 
                                                    endAdornment: <IconButton><Send/></IconButton>
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
                                                        chatOwnerId={selectedChatData.chat.owner._id}
                                                        participants={selectedChatData.chat.participants}
                                                    />
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