import { useReactiveVar } from "@apollo/client";
import { Avatar, AvatarGroup, Card, CardActionArea, CardHeader } from "@mui/material";
import { baseState } from "../../baseReactive";


const ChatItem = props => {
    const { item, chatSelectionHandler } = props;
    const { locations } = useReactiveVar(baseState);
    const participantsText = item.participants.reduce((acc, curr) => curr.nick + `, ${acc}`, "")

    return (
        <Card sx={{cursor: 'pointer', borderRadius: 0}} onClick={chatSelectionHandler}>
            <CardActionArea>
                <CardHeader 
                    title={item.title}
                    subheader={participantsText.slice(0, participantsText.length - 2)}
                    avatar={
                        <AvatarGroup max={3}>
                            {
                                item.participants.map((user, key) => {
                                    return (<Avatar key={key} src={!user.avatar.length ? "NULL" : `${locations.images}/${user.avatar}`} alt={user.nick}/>)
                                })
                            }
                        </AvatarGroup>
                    }
                />
            </CardActionArea>
        </Card>
    );
}

export default ChatItem;