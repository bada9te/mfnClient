import { Avatar, Box, CardContent, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import passwordImage from "../../images/icons/password.png"
import AccountVerifyForm from "../../components/forms/account-verify/account-verify";
import LogRegVerContainer from "../../components/containers/image-left-form-conatiner/image-left-form-container";
import VerifyAccBG from '../../images/bgs/verifyFormBG.png';
import { MODERATION_ACTION_VALIDATE_QUERY } from "../../graphql-requests/moderation-actions";
import { useQuery } from "@apollo/client";
import { SpinnerCircular } from "../../components/common/spinner/Spinner";


const AccountVerify = props => {
    const { userId, actionId } = useParams();
    
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
        <LogRegVerContainer bg={VerifyAccBG}>
            <Box sx={{width: '30rem', height: 'fit-content'}}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2}}>
                    <Avatar src={passwordImage} sx={{ m: 1, boxShadow: 5 }}/>
                </Box>
                {
                    (() => {
                        if (loading) {
                            return (
                                <>
                                    <Typography gutterBottom variant="h5" component="div" sx={{display: 'flex', justifyContent: 'center', textAlign:'center', pt: 2, mb: 0}}>
                                        Validating...
                                    </Typography>
                                    <CardContent>
                                        <SpinnerCircular/>
                                    </CardContent>
                                </>
                            );
                        }
                        if (data?.moderationActionValidate) {
                            return (
                                <>
                                    <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', textAlign:'center', pt: 2, mb: 0}}>
                                        Verify your account 
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
                                        Validation error
                                    </Typography>
                                    <CardContent>
                                        <Typography textAlign={'center'}>This action is not valid</Typography>
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