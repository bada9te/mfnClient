import emailImage from '../../images/icons/email.png'
import { Avatar, Box, CardActions, CardContent, Typography, Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountRestoreRequestForm from '../../components/forms/account-restore-request/account-restore-request';
import LogRegVerContainer from '../../components/containers/image-left-form-conatiner/image-left-form-container';
import VerifyEmailBG from '../../images/bgs/emailCheckFormBG.png';
import { Login } from '@mui/icons-material';


const AccountRestoreEmailCheck = (props)=> {
    const navigate = useNavigate();

    return(
        <LogRegVerContainer bg={VerifyEmailBG} text="Restore access to account">
            <Box sx={{ width: '30rem', height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2}}>
                    <Avatar src={emailImage} sx={{ m: 1, boxShadow: 5 }}/>
                </Box>
                <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', textAlign:'center', pt: 2, mb: 0}}>
                    Account restore
                </Typography>
                <CardContent>
                    <AccountRestoreRequestForm/>
                </CardContent>
                <CardActions>
                    <Stack direction="column" spacing={0.75} mx={2} mb={2}>
                        <Button 
                            sx={{ width: 'fit-content' }}
                            startIcon={<Login/>}
                            variant='outlined' 
                            onClick={() => navigate('/app/login')}>
                            Back to login
                        </Button>
                    </Stack>
                </CardActions>
            </Box>
        </LogRegVerContainer>
    );
}

export default AccountRestoreEmailCheck;

