import { Avatar, Box, CardContent, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import passwordImage from "../../images/icons/password.png"
import AccountVerifyForm from "../../components/forms/account-verify/account-verify";
import { checkUserVerifyById } from "../../components/forms/account-verify/accountVerifyFormSlice";
import LogRegVerContainer from "../../components/containers/image-left-form-conatiner/image-left-form-container";
import VerifyAccBG from '../../images/bgs/verifyFormBG.png';


const AccountVerify = props => {
    const { userId, actionId } = useParams();
    const actionIsValid = useSelector(state => state.accountVerifyForm.actionIsValid);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserVerifyById(userId))
    }, [userId, dispatch]);

    return(
        <LogRegVerContainer bg={VerifyAccBG}>
            <Box sx={{width: '30rem', height: 'fit-content'}}>
                {
                    (() => {
                        if (actionIsValid) {
                            return (
                                <>
                                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2}}>
                                        <Avatar src={passwordImage} sx={{ m: 1, boxShadow: 5 }}/>
                                    </Box>
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
                                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2}}>
                                        <Avatar src={passwordImage} sx={{ m: 1, bgcolor: 'secondary.main' }}/>
                                    </Box>
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