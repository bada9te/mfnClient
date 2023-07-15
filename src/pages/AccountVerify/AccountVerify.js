import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import passwordImage from "../../images/password.png"
import AccountVerifyForm from "../../components/forms/account-verify/account-verify";
import { checkUserVerifyById } from "../../components/forms/account-verify/accountVerifyFormSlice";


const AccountVerify = props => {
    const { userId, actionId } = useParams();
    const actionIsValid = useSelector(state => state.accountVerifyForm.actionIsValid);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserVerifyById(userId))
    }, [userId, dispatch]);

    return(
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
            <Card sx={{width: '20rem', height: 'fit-content', boxShadow: 3}}>
                {
                    (() => {
                        if (actionIsValid) {
                            return (
                                <>
                                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2}}>
                                        <Avatar src={passwordImage} sx={{ m: 1, bgcolor: 'secondary.main' }}/>
                                    </Box>
                                    <Typography gutterBottom variant="h5" component="div" sx={{display: 'flex', justifyContent: 'center', textAlign:'center', pt: 2, mb: 0}}>
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
            </Card>
        </Box>
    );
}

export default AccountVerify;