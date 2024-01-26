import { Avatar, AvatarGroup, Card, CardActionArea, CardHeader } from "@mui/material";

const ChatHeader = props => {
    const { handleClick } = props;

    return (
        <Card onClick={handleClick} sx={{borderRadius: 0}}>
            <CardActionArea>
                <CardHeader 
                    title="Selected chat title"
                    subheader="2/4 Online"
                    avatar={
                        <AvatarGroup max={3}>
                            <Avatar src="NULL"/>
                            <Avatar src="NULL"/>
                            <Avatar src="NULL"/>
                            <Avatar src="NULL"/>
                        </AvatarGroup>
                    }
                />
            </CardActionArea>
        </Card>
    );
}

export default ChatHeader;