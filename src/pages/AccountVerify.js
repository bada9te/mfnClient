import { Avatar, Box, CardContent, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import passwordImage from "../assets/icons/password.png"
import AccountVerifyForm from "../components/forms/account-verify/account-verify";
import LogRegVerContainer from "../components/containers/image-left-form-conatiner/image-left-form-container";
import VerifyAccBG from '../assets/bgs/verifyFormBG.png';
import { MODERATION_ACTION_VALIDATE_QUERY } from "../utils/graphql-requests/moderation-actions";
import { useQuery } from "@apollo/client";
import { SpinnerCircular } from "../components/common/spinner/Spinner";
import { useTranslation } from "react-i18next";


const AccountVerify = props => {
    const { userId, actionId } = useParams();
    const { t } = useTranslation("pages");
    
    const { data, loading } = useQuery(MODERATION_ACTION_VALIDATE_QUERY, {
        variables: {
            input: {
                userId,
                actionId,
                type: "verify",
            }
        }
    });


    return(
        <LogRegVerContainer bg={VerifyAccBG} text={t('verify.main_text')}>
            <Box sx={{ width: '30rem', height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2}}>
                    <Avatar src={passwordImage} sx={{ m: 1, boxShadow: 5 }}/>
                </Box>
                {
                    (() => {
                        if (loading) {
                            return (
                                <>
                                    <Typography gutterBottom variant="h5" component="div" sx={{display: 'flex', justifyContent: 'center', textAlign:'center', pt: 2, mb: 0}}>
                                        {t('verify.validating')}
                                    </Typography>
                                    <CardContent sx={{display: 'flex', justifyContent: 'center'}}>
                                        <SpinnerCircular/>
                                    </CardContent>
                                </>
                            );
                        }
                        if (data?.moderationActionValidate) {
                            return (
                                <>
                                    <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', textAlign:'center', pt: 2, mb: 0}}>
                                        {t('verify.verify_text')} 
                                    </Typography>
                                    <CardContent>
                                        <AccountVerifyForm userId={userId} actionId={actionId}/>
                                    </CardContent>
                                </>
                            );
                        } else {
                            return (
                                <>
                                    <Typography gutterBottom variant="h5" component="div" sx={{display: 'flex', justifyContent: 'center', textAlign:'center', pt: 2, mb: 0}}>
                                        {t('verify.error')}
                                    </Typography>
                                    <CardContent>
                                        <Typography textAlign={'center'}>{t('This action is not valid')}</Typography>
                                    </CardContent>
                                </>
                            );
                        }
                    })()
                }
            </Box>
        </LogRegVerContainer>
    );
}

export default AccountVerify;