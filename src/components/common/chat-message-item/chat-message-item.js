import { useMutation, useReactiveVar } from "@apollo/client";
import { Avatar, Box, Link, Paper, Stack, Typography } from "@mui/material";
import { baseState } from "../../baseReactive";
import getParsedDate from "../../../utils/common-functions/getParsedDate";
import ChatMessageItemDropDown from "./chat-message-item-dropdown/chat-message-item-dropdown";
import { CHAT_MESSAGES_BY_CHAT_ID_QUERY, CHAT_MESSAGE_DELETE_BY_ID_MUTATION } from "../../../utils/graphql-requests/chat-messages";
import { emitMessageDelete } from "../../../utils/socket/event-emitters/messages";
import { chatMessagesContainerState } from "../../containers/chat-messages-container/reactive";

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
    const myMsg = item.owner._id === currentUser._id;
    const avatar = item.owner.avatar.length ? `${locations.images}/${item.owner.avatar}` : "NULL";

    const [ deleteMsg ] = useMutation(CHAT_MESSAGE_DELETE_BY_ID_MUTATION, { variables: {_id: item._id} });
    const handleDelete = () => {
        deleteMsg({
            refetchQueries: [{query: CHAT_MESSAGES_BY_CHAT_ID_QUERY, variables: { _id: item.chat._id, offset: 0, limit: messagesPerLoad }}]
        }).then(({data}) => {
            const chatMsgsState = chatMessagesContainerState();
            chatMessagesContainerState({...chatMsgsState, messages: chatMsgsState.messages.filter(i => i._id !== item._id)});
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
                </Stack>
            </Paper>
            { myMsg && <ChatMessageAvatar avatar={avatar} userId={item.owner._id} nick={item.owner.nick}/> }
        </Stack>
    );
}

export default ChatMessageItem;