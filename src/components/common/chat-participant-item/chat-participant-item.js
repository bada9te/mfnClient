import { useReactiveVar } from "@apollo/client";
import { Clear, Logout, Person, PersonRemove, RemoveCircle } from "@mui/icons-material";
import { Avatar, ButtonGroup, Card, CardHeader, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { baseState } from "../../baseReactive";

const ChatParticipantItem = props => {
    const { item, chatOwnerId } = props;
    const navigate = useNavigate();
    const { user: currentUser } = useReactiveVar(baseState);
    const me = currentUser._id === item._id;
    const chatOwner = chatOwnerId === item._id;

    // open user profile
    const handleProfileOpen = () => {
        navigate(`/app/profile/${item._id}`);
    }

    // delete from chat


    return (
        <Card sx={{ borderRadius: 5, boxShadow: 5 }}>
            <CardHeader 
                title={`${me ? `${item.nick} (me)` : item.nick} ${chatOwner ? '(owner)' : ''}`} 
                avatar={<Avatar/>} 
                action={
                    <ButtonGroup>
                        <Tooltip title="Open profile">
                            <IconButton onClick={handleProfileOpen}><Person/></IconButton>
                        </Tooltip>
                        <Tooltip title={me ? "Leave chat" : "Kick user"}>
                            <IconButton>{me ? <Logout/> : <RemoveCircle/>}</IconButton>
                        </Tooltip>
                    </ButtonGroup>
                } 
            />
        </Card>
    );
}

export default ChatParticipantItem;