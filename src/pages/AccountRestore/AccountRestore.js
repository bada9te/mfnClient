import passwordImage from '../../images/icons/password.png'
import './AccountRestore.scss'
import AccountRestoreForm from '../../components/forms/account-restore/account-restore'
import { Avatar, Box, CardActions, CardContent, Typography, Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as Alert from "../../components/alerts/alerts";
import LogRegVerContainer from '../../components/containers/image-left-form-conatiner/image-left-form-container';
import newPasswordBG from '../../images/bgs/newPasswordFormBG.png';
import { useReactiveVar } from '@apollo/client';
import { baseState } from '../../components/baseReactive';


const AccountRestore = (props)=> {
    const { userId, actionId, verifyToken, type } = useParams();
    const [actionIsValid, setActionIsValid] = useState(false);
    const { theme } = useReactiveVar(baseState);
    const navigate = useNavigate();

    const cancelAccountRestore = () => {
        /*
        dispatch(cancelAccountRestoring({
            userId,
            actionId,
            verifyToken,
            type,
        }))
        .then(unwrapResult)
        .then(result => {
            if (result.data.done && result.data.action) {
                Alert.alertSuccess('Action canceled', { theme });
                navigate('/login');
            } else {
                Alert.alertError('Unexpected error', { theme });
            }
        });
        */
        console.log("CANCEL ACC RESTORE!")
    }

    useEffect(() => {
        /*
        dispatch(checkUserVerifyTokenById({
            userId,
            actionId,
            verifyToken,
            type,
        }));
        */
        console.log("CHECK USER VERIFY TOK BY ID!")
    }, [userId, verifyToken, actionId, type])

    return(
        <LogRegVerContainer bg={newPasswordBG}>
            <Box sx={{width: '30rem', height: 'fit-content', boxShadow: 0}}>
                {
                    (() => {
                        if (actionIsValid) {
                            return (
                                <>
                                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2}}>
                                        <Avatar src={passwordImage} sx={{ m: 1, boxShadow: 5 }}/>
                                    </Box>
                                    <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', textAlign:'center', pt: 2, mb: 0}}>
                                        Your account is ready to be restored
                                    </Typography>
                                    <CardContent>
                                        <AccountRestoreForm userId={userId} actionId={actionId} verifyToken={verifyToken} type={type}/>
                                    </CardContent>

                                    <CardActions>
                                        <Stack direction="column" spacing={0.75} mx={1.5} mb={1.5}>
                                            <Typography 
                                                fontSize={16} sx={{ cursor: 'pointer' }}
                                                component="div" fontWeight="bold" 
                                                color="primary" onClick={cancelAccountRestore}
                                            >
                                                Cancel account restore action
                                            </Typography>
                                        </Stack>
                                    </CardActions>
                                </>
                            );
                        } else {
                            return (
                                <>
                                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2}}>
                                        <Avatar src={passwordImage} sx={{ m: 1, boxShadow: 5 }}/>
                                    </Box>
                                    <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', textAlign:'center', pt: 2, mb: 0}}>
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

export default AccountRestore;


/*
        <>
            <div className="container-fluid position-sticky">
                <div className="row mb-5">
                    <Topbar text="Account Restore" username="UserName" where="account-restore"/>
                </div>
                <div className="row mb-5">
                    <h1 className='hs'><span className='first-first-letter'>C</span>hanging password of account</h1>
                    <h2 className='hs'><span className='second-first-letter'>A</span>ccount name</h2>
                </div>
                
                <div className='d-flex justify-content-center' >
                    <img className='logo' src={logotup} style={{width: '19em', height:'19em', borderRadius: '50%'}}></img>
                    <div className="container login-form-all" style={{border: '3px solid #d2d4d5', borderRadius: '10px', width:'340px', height:'330px'}}>
                        <AccountRestoreForm/>
                    </div>
                    
                </div>
            </div>
        </>
*/