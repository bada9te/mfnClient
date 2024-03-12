import emailImage from '../images/icons/email.png'
import { Avatar, Box, CardActions, CardContent, Typography, Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountRestoreRequestForm from '../components/forms/account-restore-request/account-restore-request';
import LogRegVerContainer from '../components/containers/image-left-form-conatiner/image-left-form-container';
import VerifyEmailBG from '../images/bgs/emailCheckFormBG.png';
import { Login } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';


const AccountRestoreEmailCheck = (props)=> {
    const navigate = useNavigate();
    const { t } = useTranslation("pages");

    return(
        <LogRegVerContainer bg={VerifyEmailBG} text={t('restore.check_email.main_text')}>
            <Box sx={{ width: '30rem', height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2}}>
                    <Avatar src={emailImage} sx={{ m: 1, boxShadow: 5 }}/>
                </Box>
                <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', textAlign:'center', pt: 2, mb: 0}}>
                    { t('restore.check_email.title') }
                </Typography>
                <CardContent>
                    <AccountRestoreRequestForm/>
                </CardContent>
                <CardActions>
                    <Stack direction="column" spacing={0.75} mx={2} mb={2}>
                        <Button 
                            sx={{ width: 'fit-content', boxShadow: 10 }}
                            startIcon={<Login/>}
                            variant='contained' 
                            onClick={() => navigate('/app/login')}>
                            {t('restore.check_email.back_to_login')}
                        </Button>
                    </Stack>
                </CardActions>
            </Box>
        </LogRegVerContainer>
    );
}

export default AccountRestoreEmailCheck;

