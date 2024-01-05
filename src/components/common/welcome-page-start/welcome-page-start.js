import { Login, PlayArrow, VpnKey } from "@mui/icons-material";
import { Avatar, Box, Button, ButtonGroup, Stack, Typography } from "@mui/material";
import AppLogoImg from "../../../images/icons/logo.png";
import WelcomePageStartBG from "../../../images/bgs/welcomePageStart.png";
import { useNavigate } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { useTranslation } from "react-i18next";

const WelcomePageStart = props => {
    const navigate = useNavigate();
    const { user: currentUser } = useReactiveVar(baseState);
    const { t } = useTranslation("welcome");

    return (
        <Box
            sx={{ 
                height: 'calc(100vh - 120px)', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap', 
                flexDirection: 'column',
                backgroundImage: `url(${WelcomePageStartBG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                pb: 10,
                scrollSnapAlign: 'start',
            }}
        >
            <Avatar src={AppLogoImg} alt="Music From Nothing" sx={{ height: { xs: '35vw', sm: '25vw', md: '12vw' }, width: { xs: '35vw', sm: '25vw', md: '12vw' } }}/>
            <Typography textAlign="center" sx={{ py: 4, fontSize: {xs: '25px', sm: '32.5px', md: '40px'} }} variant='h3'>{t('welcome.hello')} Music From Nothing</Typography>
            <Stack spacing={3} sx={{ flexDirection: { sm: "column", md: "row" } }} useFlexGap>
                <Button variant="contained" endIcon={<PlayArrow/>} onClick={() => navigate('/app')}>{t('welcome.explore_btn')}</Button>
                {
                    !currentUser._id 
                    && 
                    <ButtonGroup>
                        <Button 
                            variant="contained" 
                            endIcon={<Login/>} 
                            onClick={() => navigate('/app/login')}
                        >
                            {t('welcome.log_in')}
                        </Button> 
                        <Button 
                            variant="contained" 
                            endIcon={<VpnKey/>} 
                            onClick={() => navigate('/app/register')}
                        >
                            {t('welcome.register')}
                        </Button> 
                    </ButtonGroup>
                }
            </Stack>
        </Box>
    );
}

export default WelcomePageStart;