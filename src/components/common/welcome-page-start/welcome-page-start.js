import { Login, PlayArrow } from "@mui/icons-material";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import AppLogoImg from "../../../images/icons/logo.png";
import WelcomePageStartBG from "../../../images/bgs/welcomePageStart.png";
import { useNavigate } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";

const WelcomePageStart = props => {
    const navigate = useNavigate();
    const { user: currentUser } = useReactiveVar(baseState);

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
            <Stack spacing={3} direction="row" useFlexGap>
                <Button variant="contained" endIcon={<PlayArrow/>} onClick={() => navigate('/app')}>Explore creations</Button>
                {
                    !currentUser._id 
                    && 
                    <Button 
                        variant="contained" 
                        endIcon={<Login/>} 
                        onClick={() => navigate('/app/login')}
                    >
                        Log in
                    </Button> 
                }
            </Stack>
        </Box>
    );
}

export default WelcomePageStart;