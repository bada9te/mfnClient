import RegisterForm from '../../components/forms/register/register';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardActions, CardContent, Typography, Avatar, Stack, Grid, Paper } from '@mui/material';
import loginImage from '../../images/logo.png';
import registerFormBG from '../../images/registerFormBG.png';


const Register = () => {
    const navigate = useNavigate();

    return (
       
        
                <Grid container component="main" sx={{  height: '100vh' }}>
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={8}
                        sx={{
                            backgroundImage: `url(${registerFormBG})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />

                    <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square sx={{boxShadow: 20, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Box sx={{ 
                            width: '30rem', 
                            boxShadow: 0, 
                        }}>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2}}>
                                <Avatar src={loginImage} sx={{ m: 1, bgcolor: 'secondary.main' }}/>
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
                    </Grid>
                </Grid>
            
    );
}

export default Register;