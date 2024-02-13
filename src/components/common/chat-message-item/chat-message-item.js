import { useMutation, useReactiveVar } from "@apollo/client";
import { Avatar, Box, Link, Paper, Stack, Typography } from "@mui/material";
import { baseState } from "../../baseReactive";
import getParsedDate from "../../../utils/common-functions/getParsedDate";
import ChatMessageItemDropDown from "./chat-message-item-dropdown/chat-message-item-dropdown";
import { CHAT_MESSAGES_BY_CHAT_ID_QUERY, CHAT_MESSAGE_DELETE_BY_ID_MUTATION } from "../../../utils/graphql-requests/chat-messages";
import { emitMessageDelete } from "../../../utils/socket/event-emitters/messages";
import { chatMessagesContainerState } from "../../containers/chat-messages-container/reactive";
import { chatsContainerState } from "../../containers/chats-container/reactive";

const ChatMessageAvatar = ({avatar, userId, nick}) => {
    return (
        <Link href={`/app/profile/${userId}`}>
            <Avatar sx={{ boxShadow: 5 }} src={avatar} alt={nick}/>
        </Link>
    )
}

const ChatMessageItem = props => {
    const { item, chatParticipants } = props;
    const { user: currentUser, locations } = useReactiveVar(baseState);
    const { messagesPerLoad } = useReactiveVar(chatMessagesContainerState);
    const { selectedChatId } = useReactiveVar(chatsContainerState);
    const myMsg = item.owner._id === currentUser._id;
    const avatar = item.owner.avatar.length ? `${locations.images}/${item.owner.avatar}` : "NULL";

    const [ deleteMsg ] = useMutation(CHAT_MESSAGE_DELETE_BY_ID_MUTATION, { variables: {_id: item._id} });
    const handleDelete = () => {
        deleteMsg({
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

    const handleReply = async() => {
        chatMessagesContainerState({...chatMessagesContainerState(), replyingTo: {
            messageId: item._id,
            userId: item.owner._id,
            userNick: item.owner.nick,
        }});
    }

    const handleEdit = async() => {
        chatMessagesContainerState({ ...chatMessagesContainerState(), messageText: item.text, editingMessageId: item._id });
    }

    return (
        <Stack spacing={1} useFlexGap flexWrap="wrap" flexDirection="row" 
            sx={{ width: '100%', display: 'flex', justifyContent: myMsg ? "end": "start", alignItems: 'start' }}
        >
            { !myMsg && <ChatMessageAvatar avatar={avatar} userId={item.owner._id} nick={item.owner.nick}/> }
            <Paper elevation={5} sx={{ borderRadius: 3, p: 1, pb: 0 }}>
                <Stack spacing={0.5} useFlexGap display="flex" alignItems={myMsg ? 'end':'start'}>
                    <ChatMessageItemDropDown
                        canBeDeleted={myMsg}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleReply={handleReply}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'end', flexWrap: 'wrap', flexDirection: 'column' }}>
                            <Typography fontSize={12} sx={{px: 0.5, width: 'fit-content', maxWidth: '350px'}}>{`${item.owner.nick}`}</Typography>
                            <Typography fontSize={9} sx={{px: 0.5, width: 'fit-content', maxWidth: '350px'}} fontStyle='italic'>{`${getParsedDate(new Date(+item.createdAt))}`}</Typography>
                        </Box>
                    </ChatMessageItemDropDown>
                    
                    <Box sx={{ width: 'fit-content', maxWidth: 'calc(100vw - 100px)', borderRadius: 5, overflowWrap: 'break-word', p: 1, px: 1.2}} elevation={5}>
                        <Typography fontFamily="'Roboto', sans-serif" flexWrap="wrap" fontSize={13} sx={{ maxWidth: '350px'}}>
                            {item.text}
                        </Typography>
                    </Box>

                    {
                        item?.replies.length
                        ?
                        <Stack spacing={1} sx={{pb: 1}}>
                            {
                                item.replies.map((i, key) => {
                                    return (
                                        <Paper key={key} elevation={5} sx={{borderRadius: 3}}>
                                            <Stack display="flex" useFlexGap flexWrap="wrap" direction="row" spacing={1} sx={{p: 1}}> 
                                                { !myMsg && <ChatMessageAvatar avatar={avatar} userId={i.owner._id} nick={i.owner.nick}/> }
                                                <ChatMessageItemDropDown
                                                    canBeDeleted={myMsg}
                                                    handleEdit={handleEdit}
                                                    handleDelete={handleDelete}
                                                    handleReply={handleReply}
                                                >
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: myMsg ? 'end':'start' }}>
                                                        <Typography fontSize={12} sx={{px: 0.5, width: 'fit-content', maxWidth: '350px'}}>{`${item.owner.nick}`}</Typography>
                                                        <Typography fontSize={9} sx={{px: 0.5, width: 'fit-content', maxWidth: '350px'}} fontStyle='italic'>{`${getParsedDate(new Date(+item.createdAt))}`}</Typography>
                                                    </Box>
                                                </ChatMessageItemDropDown>
                                                { myMsg && <ChatMessageAvatar avatar={avatar} userId={item.owner._id} nick={item.owner.nick}/> }
                                            </Stack>
                                            
                                            <Box sx={{ width: 'fit-content', maxWidth: 'calc(100vw - 100px)', borderRadius: 5, overflowWrap: 'break-word', p: 1, px: 1.2}} elevation={5}>
                                                <Typography fontFamily="'Roboto', sans-serif" flexWrap="wrap" fontSize={13} sx={{ maxWidth: '350px'}}>
                                                    {i.text}
                                                </Typography>
                                            </Box>
                                        </Paper>
                                    )
                                })
                            }
                        </Stack>
                        :
                        null
                    }
                </Stack>
            </Paper>
            { myMsg && <ChatMessageAvatar avatar={avatar} userId={item.owner._id} nick={item.owner.nick}/> }
        </Stack>
    );
}

export default ChatMessageItem;