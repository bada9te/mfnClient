import { useReactiveVar } from "@apollo/client";
import { Avatar, AvatarGroup, Box, Card, CardActionArea, CardHeader } from "@mui/material";
import { baseState } from "../../baseReactive";
import { ArrowForward, Info, InfoOutlined } from "@mui/icons-material";

const ChatHeader = props => {
    const { handleClick, chat } = props;
    const { locations } = useReactiveVar(baseState);

    return (
        <Card onClick={handleClick} sx={{borderRadius: 0}}>
            <CardActionArea>
                <CardHeader 
                    title={chat.title}
                    subheader={`${chat.participants.length} participants`}
                    avatar={
                        <AvatarGroup max={3}>
                            {
                                chat.participants.map((user, key) => {
                                    return (<Avatar key={key} src={user.avatar.endsWith('/') ? "NULL" : `${locations.images}/${user.avatar}`}/>)
                                })
                            }
                        </AvatarGroup>
                    }
                />
            </CardActionArea>
        </Card>
    );
}

export default ChatHeader;