import { PlayArrow } from "@mui/icons-material";
import { Avatar, Box, Button, Typography } from "@mui/material";
import AppLogoImg from "../../../images/icons/logo.png";
import WelcomePageStartBG from "../../../images/bgs/welcomePageStart.png";

const WelcomePageStart = props => {
    return (
        <Box sx={{ 
            height: 'calc(100vh - 50px)', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            flexDirection: 'column',
            backgroundImage: `url(${WelcomePageStartBG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            pb: 10
        }}>
            <Avatar src={AppLogoImg} alt="Music From Nothing" sx={{ height: '180px', width: '180px' }}/>
            <Typography textAlign="center" sx={{ py: 4 }} variant="h3">Welcome to Music From Nothing</Typography>
            <Button variant="contained" endIcon={<PlayArrow/>}>Explore creations</Button>
        </Box>
    );
}

export default WelcomePageStart;