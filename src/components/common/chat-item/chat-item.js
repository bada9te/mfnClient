import { useReactiveVar } from "@apollo/client";
import { Avatar, AvatarGroup, Card, CardActionArea, CardContent, CardHeader, Typography } from "@mui/material";
import { baseState } from "../../baseReactive";
import getTimeSince from "../../../utils/common-functions/getTimeSince";

const ChatItem = props => {
    const { item, chatSelectionHandler } = props;
    const { locations } = useReactiveVar(baseState);

    return (
        <Card sx={{cursor: 'pointer', borderRadius: 0}} onClick={chatSelectionHandler}>
            <CardActionArea>
                <CardHeader 
                    title={item.title}
                    subheader={item.lastMessage ? getTimeSince(new Date(+item.lastMessage?.createdAt)) : "No messages yet"}
                    avatar={
                        <AvatarGroup max={3}>
                            {
                                item.participants.map((user, key) => {
                                    return (<Avatar key={key} src={!user.avatar.length ? "NULL" : `${locations.images}/${user.avatar}`}/>)
                                })
                            }
                        </AvatarGroup>
                    }
                />
                <CardContent>
                    <Typography>{item.lastMessage ? item.lastMessage.text : "No messages yet"}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default ChatItem;