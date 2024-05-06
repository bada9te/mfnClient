import LoginForm from '../components/forms/login/login';
import { CardActions, CardContent, Typography, Box, Avatar, Stack, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import loginImage from '../assets/icons/logo.png';
import loginFormBG from '../assets/bgs/loginFormBG.png';
import LogRegVerContainer from '../components/containers/image-left-form-conatiner/image-left-form-container';
import { HowToReg, LockReset } from '@mui/icons-material';
import { useTranslation } from "react-i18next";
import BaseContentContainer from 'components/containers/base-content-container/base-content-container';


export default function Login() {
    const navigate = useNavigate();
    const { t } = useTranslation("pages");

    return (
        <BaseContentContainer>
            <LogRegVerContainer bg={loginFormBG} text={t('login.main_text')}>
                <Box sx={{ width: '30rem', height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2}}>
                        <Avatar src={loginImage} sx={{ m: 1, boxShadow: 5 }}/>
                    </Box>
                    <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 2, mb: 0}}>
                        {t('login.title')}
                    </Typography>
                    <CardContent>
                        <LoginForm/>
                    </CardContent>
                    <CardActions>
                        <Stack direction="column" spacing={2} mx={2} mb={2}>
                            <Button 
                                sx={{ width: 'fit-content', boxShadow: 10 }}
                                startIcon={<LockReset/>}
                                variant='contained'
                                color='primary'
                                onClick={() => navigate('/app/account-restore/email-check')}>
                                {t('login.forgot_password')}
                            </Button>
                            <Button 
                                sx={{ width: 'fit-content', boxShadow: 10 }}
                                startIcon={<HowToReg/>}
                                variant='contained' 
                                color='primary'
                                onClick={() => navigate('/app/register')}>
                                {t('login.havent_registered_yet')}
                            </Button>
                        </Stack>
                    </CardActions>
                </Box>
            </LogRegVerContainer>
        </BaseContentContainer>
    );
}

