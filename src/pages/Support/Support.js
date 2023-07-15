import FormSupportContact from "../../components/forms/support-contact/support-contact";
import { Box, CardActions, CardContent, Typography } from "@mui/material";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";


const Support = (props) => {
    return (
        <>
            <Box>
                <Box sx={{pt: 2}}>
                    <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 3, mb: 0}}>
                        Support
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 3, mb: 0}}>
                        Please describe your problem with form below:
                    </Typography>
                </Box>

                <Box sx={{pt: 5, m: 1, w: '100%', display: 'flex', justifyContent: 'center'}}>
                    <Box sx={{boxShadow: 3, maxWidth: 700}}>
                        <Card>
                            <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 3, mb: 0}}>
                                Contact us
                            </Typography>
                            <CardContent>
                                <FormSupportContact/>
                            </CardContent>
                            <CardActions sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    bgcolor: 'rgba(230,230,230,0.3)',
                                    
                                }}>
                                <Typography>
                                    Please, be polite with the project administration. Visit the <Link to={'/f.a.q'}>F.A.Q</Link> page before filling in this form.
                                </Typography>
                            </CardActions>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </>
    );
}


export default Support;