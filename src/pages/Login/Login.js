import LoginForm from '../../components/forms/login/login';
import { Card, CardActions, CardContent, Typography, Box, Avatar, Stack } from '@mui/material';
import { useNavigate } from "react-router-dom";
import loginImage from '../../images/logo.png';


const Login = (props) => {
    const navigate = useNavigate();
    return (
        <>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                <Card sx={{ width: '20rem', height: 'fit-content', boxShadow: 3 }}>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2}}>
                        <Avatar src={loginImage} sx={{ m: 1, bgcolor: 'secondary.main' }}/>
                    </Box>
                    <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 2, mb: 0}}>
                        Login
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
                </Card>
            </Box>
        </>
    );
}


export default Login;