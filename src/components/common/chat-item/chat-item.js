import { Avatar, AvatarGroup, Card, CardActionArea, CardContent, CardHeader, Typography } from "@mui/material";

const ChatItem = props => {
    const { item, chatSelectionHandler } = props;

    return (
        <Card sx={{cursor: 'pointer', borderRadius: 0}} onClick={chatSelectionHandler}>
            <CardActionArea>
                <CardHeader 
                    title={item._id}
                    subheader={"two weeks ago"}
                    avatar={
                        <AvatarGroup max={3}>
                            <Avatar src="NULL"/>
                            <Avatar src="NULL"/>
                            <Avatar src="NULL"/>
                            <Avatar src="NULL"/>
                        </AvatarGroup>
                    }
                />
                <CardContent>
                    <Typography>Last message placeholder</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default ChatItem;