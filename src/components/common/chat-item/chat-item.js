import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";


const ChatItem = props => {
    const {id, heading, placeholder, image, selectChat} = props;

    // can be active in className (color blue)
    return (
        <Card sx={{ 
                display: 'flex', 
                justifyContent: 'space-evenly', 
                alignItems: 'center', 
                p: 2, 
                cursor: 'pointer',
                "&:hover": {
                    backgroundColor: '#f8f9fa'
                },
                transition: 'background-color 0.3s ease-out',
            }} 
            onClick={() => selectChat(id)}
        >
            <CardMedia
                component="img"
                sx={{ width: 75, height: 75, borderRadius: 50 }}
                image={image}
                alt="chat-image"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto', "&:last-child": { paddingBottom: '16px' } }}>
                    <Typography component="div" textOverflow="ellipsis" maxWidth={200} overflow="hidden">
                        {heading}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {placeholder}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
}


export default ChatItem;