import { useReactiveVar } from "@apollo/client";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { baseState } from "../../baseReactive";
import getParsedDate from "../../../utils/common-functions/getParsedDate";


const ChatMessageItem = props => {
    const { item } = props;
    const { user: currentUser } = useReactiveVar(baseState);
    const myMsg = item.owner._id === currentUser._id;


    return (
        <Stack spacing={1} useFlexGap flexWrap="wrap" flexDirection="row" 
            sx={{ 
                width: '100%',
                display: 'flex',
                justifyContent: myMsg ? "end": "start",
                alignItems: 'start',
            }}
        >
            { !myMsg && <Avatar src="NULL"/> }
            <Stack spacing={0.5} useFlexGap display="flex" alignItems={myMsg ? 'end':'start'} >
                <Typography fontSize={14} sx={{px: 0.5, width: 'fit-content', maxWidth: '350px'}}>{`${item.owner.nick}`}</Typography>
                <Typography fontSize={10} sx={{px: 0.5, width: 'fit-content', maxWidth: '350px'}} fontStyle='italic'>{`${getParsedDate(new Date(+item.createdAt))}`}</Typography>
                <Box 
                    sx={{ 
                        width: 'fit-content',
                        maxWidth: 'calc(100vw - 100px)',
                        borderRadius: 5,
                        boxShadow: 3,
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
            { myMsg && <Avatar src="NULL"/> }
        </Stack>
    );
}

export default ChatMessageItem;