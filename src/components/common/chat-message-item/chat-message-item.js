import { useReactiveVar } from "@apollo/client";
import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import { baseState } from "../../baseReactive";
import getParsedDate from "../../../utils/common-functions/getParsedDate";


const ChatMessageItem = props => {
    const { item } = props;
    const { user: currentUser, locations } = useReactiveVar(baseState);
    const myMsg = item.owner._id === currentUser._id;
    const avatar = item.owner.avatar.length ? `${locations.images}/${item.owner.avatar}` : "NULL";

    return (
        <Stack spacing={1} useFlexGap flexWrap="wrap" flexDirection="row" 
            sx={{ 
                width: '100%',
                display: 'flex',
                justifyContent: myMsg ? "end": "start",
                alignItems: 'start',
            }}
        >
            { !myMsg && <Avatar src={avatar}/> }
            <Paper elevation={5} sx={{ borderRadius: 3, p: 1, pb: 0 }}>
                <Stack spacing={0.5} useFlexGap display="flex" alignItems={myMsg ? 'end':'start'}>
                    <Button sx={{ m: 0, p: 0, display: 'flex', alignItems: 'end', flexWrap: 'wrap', flexDirection: 'column' }}>
                        <Typography fontSize={12} sx={{px: 0.5, width: 'fit-content', maxWidth: '350px'}}>{`${item.owner.nick}`}</Typography>
                        <Typography fontSize={9} sx={{px: 0.5, width: 'fit-content', maxWidth: '350px'}} fontStyle='italic'>{`${getParsedDate(new Date(+item.createdAt))}`}</Typography>
                    </Button>
                    
                    <Box 
                        sx={{ 
                            width: 'fit-content',
                            maxWidth: 'calc(100vw - 100px)',
                            borderRadius: 5,
                            overflowWrap: 'break-word',
                            p: 1, px: 1.2,
                        }} 
                        elevation={5}
                    >
                        <Typography 
                            fontFamily="'Roboto', sans-serif" 
                            flexWrap="wrap" 
                            fontSize={13}
                            sx={{ maxWidth: '350px'}}
                        >
                            {item.text}
                        </Typography>
                    </Box>
                </Stack>
            </Paper>
            { myMsg && <Avatar src={avatar}/> }
        </Stack>
    );
}

export default ChatMessageItem;