import RegisterForm from '../../components/forms/register/register';
import { useNavigate } from 'react-router-dom';
import { Box, CardActions, CardContent, Typography, Avatar, Stack } from '@mui/material';
import loginImage from '../../images/logo.png';
import registerFormBG from '../../images/registerFormBG.png';
import LogRegVerContainer from '../../components/containers/log-reg-ver-conatiner/log-reg-ver-container';


const Register = () => {
    const navigate = useNavigate();

    return (
        <LogRegVerContainer bg={registerFormBG}>
            <Box sx={{ 
                width: '30rem', 
                boxShadow: 0, 
            }}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2}}>
                    <Avatar src={loginImage} sx={{ m: 1, boxShadow: 5 }}/>
                </Box>
                <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 2, mb: 0}}>
                    Register
                </Typography>
                <CardContent>
                    <RegisterForm/>
                </CardContent>
                <CardActions>
                    <Stack direction="column" spacing={0.75} mx={2} mb={2}>
                        <Typography 
                            fontSize={16} sx={{ cursor: 'pointer' }}
                            component="div" fontWeight="bold" 
                            color="primary" onClick={() => navigate('/login')}
                        >
                            Already registered
                        </Typography>
                    </Stack>
                </CardActions> 
            </Box>
        </LogRegVerContainer>       
                   
            
    );
}

export default Register;