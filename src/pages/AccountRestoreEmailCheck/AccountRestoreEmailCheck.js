import emailImage from '../../images/email.png'
import { Avatar, Box, Card, CardActions, CardContent, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountRestoreRequestForm from '../../components/forms/account-restore-request/account-restore-request';


const AccountRestoreEmailCheck = (props)=> {
    const navigate = useNavigate();

    return(
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
            <Card sx={{width: '20rem', height: 'fit-content', boxShadow: 3}}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2}}>
                    <Avatar src={emailImage} sx={{ m: 1, bgcolor: 'secondary.main' }}/>
                </Box>
                <Typography gutterBottom variant="h5" component="div" sx={{display: 'flex', justifyContent: 'center', textAlign:'center', pt: 2, mb: 0}}>
                    Account restore
                </Typography>
                <CardContent>
                    <AccountRestoreRequestForm/>
                </CardContent>
                <CardActions>
                    <Stack direction="column" spacing={0.75} mx={2} mb={2}>
                        <Typography 
                            fontSize={16} sx={{ cursor: 'pointer' }}
                            component="div" fontWeight="bold" 
                            color="primary" onClick={() => navigate('/login')}
                        >
                            Back to login
                        </Typography>
                    </Stack>
                </CardActions>
            </Card>
        </Box>
    );
}

export default AccountRestoreEmailCheck;

