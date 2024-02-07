import { useReactiveVar } from "@apollo/client";
import { Avatar, AvatarGroup, Card, CardActionArea, CardHeader } from "@mui/material";
import { baseState } from "../../baseReactive";
import { SpinnerCircular } from "../spinner/Spinner";


const ChatHeader = props => {
    const { handleClick, chat, loading } = props;
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
                                    return (<Avatar key={key} src={!user.avatar.length ? "NULL" : `${locations.images}/${user.avatar}`}/>)
                                })
                            }
                        </AvatarGroup>
                    }
                    
                    action={loading && <SpinnerCircular/>}
                />
            </CardActionArea>
        </Card>
    );
}

export default ChatHeader;