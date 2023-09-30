import LoginForm from '../../components/forms/login/login';
import { Card, CardActions, CardContent, Typography, Box, Avatar, Stack } from '@mui/material';
import { Copyright } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import loginImage from '../../images/logo.png';
import loginFormBG from '../../images/loginFormBG.png';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const Login = (props) => {
    const navigate = useNavigate();
    return (
        
            
                <Grid container component="main" sx={{  height: '100vh' }}>
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={8}
                        sx={{
                            backgroundImage: `url(${loginFormBG})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />

                    <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square sx={{boxShadow: 20, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Box sx={{ 
                            width: '30rem', 
                            height: 'fit-content', 
                            boxShadow: 0, 
                            }}
                        >
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
                        </Box>
                    </Grid>
                </Grid>
          
           
        
    );
}


export default Login;


/*
            
<Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh'}}>
            </Box>
            */