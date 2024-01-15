import { Avatar, Box, Typography } from "@mui/material";

const InfoImage = props => {
    return (
        <Box sx={{minHeight: 'calc(100vh - 215px)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2}}>
            <Avatar src={props.src} alt="Playlist's logo" sx={{ width: 100, height: 100, boxShadow: 10 }} />
            <Typography>{props.text}</Typography>
        </Box>
    );
}


export default InfoImage;