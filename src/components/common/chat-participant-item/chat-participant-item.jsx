import { useReactiveVar } from "@apollo/client";
import { Logout, Person, RemoveCircle } from "@mui/icons-material";
import { Avatar, ButtonGroup, Card, CardHeader, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { baseState } from "@/components/baseReactive";

const ChatParticipantItem = props => {
    const { item, chatOwnerId, switchParticipants } = props;
    const navigate = useNavigate();
    const { user: currentUser, locations } = useReactiveVar(baseState);
    const me = currentUser._id === item._id;
    const chatOwner = chatOwnerId === item._id;

    // open user profile
    const handleProfileOpen = () => {
        navigate(`/app/profile/${item._id}`);
    }

    // delete from chat
    const handleUserDeletion = () => {
        switchParticipants([{ _id: item._id }]);
    }

    return (
        <Card sx={{ borderRadius: 5, boxShadow: 5 }}>
            <CardHeader 
                title={`${me ? `${item.nick} (me)` : item.nick} ${chatOwner ? '(owner)' : ''}`} 
                avatar={<Avatar alt={item.nick} src={item.avatar.length ? `${locations.images}/${item.avatar}` : "NULL"} />} 
                action={
                    <ButtonGroup>
                        <Tooltip title="Open profile">
                            <IconButton onClick={handleProfileOpen}><Person/></IconButton>
                        </Tooltip>
                        <Tooltip title={me ? "Leave chat" : "Kick user"}>
                            <IconButton onClick={handleUserDeletion}>{me ? <Logout/> : <RemoveCircle/>}</IconButton>
                        </Tooltip>
                    </ButtonGroup>
                } 
            />
        </Card>
    );
}

export default ChatParticipantItem;