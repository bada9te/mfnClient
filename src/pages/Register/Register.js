import RegisterForm from '../../components/forms/register/register';
import { useNavigate } from 'react-router-dom';
import { Box, CardActions, CardContent, Typography, Avatar, Stack, Button } from '@mui/material';
import loginImage from '../../images/icons/logo.png';
import registerFormBG from '../../images/bgs/loginFormBG.png';
import LogRegVerContainer from '../../components/containers/image-left-form-conatiner/image-left-form-container';
import { Login } from '@mui/icons-material';


const Register = () => {
    const navigate = useNavigate();

    return (
        <LogRegVerContainer bg={registerFormBG} text="Let’s get started!">
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
                        <Button 
                            sx={{ width: 'fit-content' }}
                            startIcon={<Login/>}
                            variant='outlined' 
                            onClick={() => navigate('/app/login')}>
                            Already registered
                        </Button>
                    </Stack>
                </CardActions> 
            </Box>
        </LogRegVerContainer>       
                   
            
    );
}

export default Register;