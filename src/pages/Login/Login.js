import LoginForm from '../../components/forms/login/login';
import { CardActions, CardContent, Typography, Box, Avatar, Stack } from '@mui/material';
import { useNavigate } from "react-router-dom";
import loginImage from '../../images/icons/logo.png';
import loginFormBG from '../../images/bgs/loginFormBG.png';
import LogRegVerContainer from '../../components/containers/image-left-form-conatiner/image-left-form-container';


const Login = (props) => {
    const navigate = useNavigate();
    return (
        <LogRegVerContainer bg={loginFormBG}>
            <Box sx={{ 
                width: '30rem', 
                height: 'fit-content', 
                boxShadow: 0, 
                }}
            >
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2}}>
                    <Avatar src={loginImage} sx={{ m: 1, boxShadow: 5 }}/>
                </Box>
                <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 2, mb: 0}}>
                    Sign in
                </Typography>
                <CardContent>
                    <LoginForm/>
                </CardContent>
                <CardActions>
                    <Stack direction="column" spacing={0.75} mx={2} mb={2}>
                        <Typography 
                            fontSize={16} sx={{ cursor: 'pointer' }}
                            component="div" fontWeight="bold" 
                            color="primary" onClick={() => navigate('/account-restore/email-check')}
                        >
                            Forgot password
                        </Typography>
                        <Typography 
                            fontSize={16} sx={{ cursor: 'pointer' }}
                            component="div" fontWeight="bold" 
                            color="primary" onClick={() => navigate('/register')}
                        >
                            Haven't registered yet
                        </Typography>
                    </Stack>
                </CardActions>
            </Box>
        </LogRegVerContainer>
            
               
                    
          
           
        
    );
}


export default Login;


/*
            
<Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh'}}>
            </Box>
            */