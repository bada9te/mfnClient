import FormSupportContact from "../components/forms/support-contact/support-contact";
import { Box, CardActions, CardContent, Typography, Stack, Avatar, Button } from "@mui/material";
import { Quiz } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import supportContactImage from "../images/icons/logo_support.png";
import ImageRightFormContainer from "../components/containers/image-right-form-container/image-right-form.container";
import BaseContentContainer from "../components/containers/base-content-container/base-content-container";
import supportFromBG from "../images/bgs/supportFormBG.png";
import { useTranslation } from "react-i18next";


const Support = (props) => {
    const navigate = useNavigate();
    const { t } = useTranslation("pages");

    return (
        <BaseContentContainer>
            <ImageRightFormContainer bg={supportFromBG} text={t('support.main_text')}>
                <Box sx={{height: 'calc(100vh - 132px)'}}>
                    <Box sx={{ 
                        boxShadow: 0, maxWidth: 700, borderRadius: 5, 
                        display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column',
                        height: 'calc(100vh - 132px)'
                    }}>
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2 }}>
                            <Avatar src={supportContactImage} sx={{ m: 1, boxShadow: 5 }}/>
                        </Box>
                        <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 3, mb: 0}}>
                            {t('support.title')}
                        </Typography>
                        <CardContent>
                            <FormSupportContact/>
                        </CardContent>
                        <CardActions>
                            <Stack direction="column" spacing={2} mx={2} mb={2}>
                                <Typography >
                                    {t('support.notice')}
                                </Typography>
                                <Button 
                                    sx={{ width: 'fit-content' }}
                                    startIcon={<Quiz/>}
                                    variant='contained' 
                                    color='primary'
                                    onClick={() => navigate('/app/f.a.q')}>
                                    {t('support.open_f.a.q')}
                                </Button>
                            </Stack>
                        </CardActions>
                    </Box>
                </Box>
            </ImageRightFormContainer>    
        </BaseContentContainer>
    );
}


export default Support;




/**
 * <Box sx={{pt: 5, m: 1, w: '100%', display: 'flex', justifyContent: 'center'}}>
 * 
 * 
 */