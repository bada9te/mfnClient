import RegisterForm from '../../components/forms/register/register';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardActions, CardContent, Typography, Avatar, Stack } from '@mui/material';
import loginImage from '../../images/logo.png';


const Register = () => {
    const navigate = useNavigate();

    return (
        <>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                <Card sx={{width: '20rem', height: 'fit-content', boxShadow: 3}}>
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
                </Card>
            </Box>
        </>
    );
}

export default Register;