import { Login, PlayArrow, VpnKey } from "@mui/icons-material";
import { Avatar, Box, Button, ButtonGroup, Stack, Typography } from "@mui/material";
import AppLogoImg from "../../../assets/icons/logo.png";
import WelcomePageStartBG from "../../../assets/bgs/welcomePageStart.png";
import { useNavigate } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { useTranslation } from "react-i18next";

const WelcomePageStart = props => {
    const navigate = useNavigate();
    const { user: currentUser } = useReactiveVar(baseState);
    const { t } = useTranslation("pages");

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
                backdropFilter: 'blur(5px)',
                pb: 10,
                scrollSnapAlign: 'start',
            }}
        >
            <Avatar src={AppLogoImg} alt="Music From Nothing" sx={{ height: { xs: '35vw', sm: '25vw', md: '12vw' }, width: { xs: '35vw', sm: '25vw', md: '12vw' } }}/>
            <Typography textAlign="center" sx={{ py: 4, fontSize: {xs: '40px', sm: '45px', md: '55px'} }} variant='h3'>{t('welcome.hello')} Music From Nothing</Typography>
            <Stack spacing={3} sx={{ flexDirection: { sm: "column", md: "row" } }} useFlexGap>
                <Button 
                    variant="contained" 
                    endIcon={<PlayArrow/>} 
                    onClick={() => navigate('/app')}
                    color="secondary"
                >
                    {t('welcome.explore_btn')}
                </Button>
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