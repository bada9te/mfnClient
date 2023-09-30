import FormSupportContact from "../../components/forms/support-contact/support-contact";
import { Box, CardActions, CardContent, Typography, Card, Stack, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import supportContactImage from "../../images/logo_support.png";


const Support = (props) => {
    const navigate = useNavigate();

    return (
        <>
            <Box>
                <Box sx={{m: 2}}>
                    <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 3, mb: 0}}>
                        Support
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 3, mb: 0}}>
                        Please describe your problem with form below:
                    </Typography>
                </Box>

                <Box sx={{pt: 5, m: 1, w: '100%', display: 'flex', justifyContent: 'center'}}>
                    
                        <Card sx={{boxShadow: 3, maxWidth: 700, borderRadius: 5}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2}}>
                                <Avatar src={supportContactImage} sx={{ m: 1, boxShadow: 5 }}/>
                            </Box>
                            <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 3, mb: 0}}>
                                Contact us
                            </Typography>
                            <CardContent>
                                <FormSupportContact/>
                            </CardContent>
                            <CardActions>
                                <Stack direction="column" spacing={0.75} mx={2} mb={2}>
                                    <Typography >
                                        Please, be polite with the project administration. Visit the F.A.Q page before filling in this form.
                                    </Typography>
                                    <Typography 
                                        fontSize={16} sx={{ cursor: 'pointer' }}
                                        component="div" fontWeight="bold" 
                                        color="primary" onClick={() => navigate('/f.a.q')}
                                    >
                                        Open F.A.Q page
                                    </Typography>
                                </Stack>
                            </CardActions>
                        </Card>
                    
                </Box>
            </Box>
        </>
    );
}


export default Support;