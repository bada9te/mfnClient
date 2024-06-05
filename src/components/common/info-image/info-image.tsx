import { Avatar, Box, Typography } from "@mui/material";

export default function InfoImage(props: {
    src?: string;
    text: string;
}) {
    return (
        <Box sx={{minHeight: 'calc(100vh - 215px)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2}}>
            <Avatar src={props.src} alt="Playlist's logo" sx={{ width: 100, height: 100, boxShadow: 10 }} />
            <Typography>{props.text}</Typography>
        </Box>
    );
}
