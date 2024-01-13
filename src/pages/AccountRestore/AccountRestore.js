import passwordImage from '../../images/icons/password.png';
import AccountRestoreForm from '../../components/forms/account-restore/account-restore'
import { Avatar, Box, CardActions, CardContent, Typography, Stack, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import LogRegVerContainer from '../../components/containers/image-left-form-conatiner/image-left-form-container';
import newPasswordBG from '../../images/bgs/newPasswordFormBG.png';
import { useMutation, useQuery } from '@apollo/client';
import { MODERATION_ACTION_DELETE_MUTATION, MODERATION_ACTION_VALIDATE_QUERY } from '../../graphql-requests/moderation-actions';
import { useSnackbar } from 'notistack';
import { SpinnerCircular } from '../../components/common/spinner/Spinner';
import { Cancel } from '@mui/icons-material';


const AccountRestore = (props)=> {
    const { userId, actionId, verifyToken, type } = useParams();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [ deleteModerationAction ] = useMutation(MODERATION_ACTION_DELETE_MUTATION, {
        variables: {
            input: {
                userId,
                actionId,
                verifyToken,
                type,
            }
        }
    });
    const { data, loading } = useQuery(MODERATION_ACTION_VALIDATE_QUERY, {
        variables: {
            input: {
                userId,
                actionId,
                type,
            }
        }
    });

    const cancelAccountRestore = () => {
        deleteModerationAction()
            .then(({ data }) => {
                enqueueSnackbar('Action was canceled', { autoHideDuration: 3000, variant: 'info' });
                navigate('/app/login');
            }).catch(err => {
                enqueueSnackbar('Unexpected error', { autoHideDuration: 3000, variant: 'error' });
            });
    }


    return(
        <LogRegVerContainer bg={newPasswordBG} text="New password">
            <Box sx={{ width: '30rem', height: '100%', boxShadow: 0, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2}}>
                    <Avatar src={passwordImage} sx={{ m: 1, boxShadow: 5 }}/>
                </Box>
                {
                    (() => {
                        if (loading) {
                            return (
                                <>
                                    <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', textAlign:'center', pt: 2, mb: 0}}>
                                        Validating...
                                    </Typography>
                                    <CardContent sx={{display: 'flex', justifyContent: 'center'}}>
                                        <SpinnerCircular/>
                                    </CardContent>
                                </>
                            );
                        } else if (data?.moderationActionValidate) {
                            return (
                                <>
                                    <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', textAlign:'center', pt: 2, mb: 0}}>
                                        Your account is ready to be restored
                                    </Typography>
                                    <CardContent>
                                        <AccountRestoreForm userId={userId} actionId={actionId} verifyToken={verifyToken} type={type}/>
                                    </CardContent>

                                    <CardActions>
                                        <Stack direction="column" spacing={0.75} mx={1.5} mb={1.5}>
                                            <Button 
                                                sx={{ width: 'fit-content', boxShadow: 10 }}
                                                startIcon={<Cancel/>}
                                                variant='contained' 
                                                onClick={cancelAccountRestore}
                                            >
                                                Cancel account restore action
                                            </Button>
                                        </Stack>
                                    </CardActions>
                                </>
                            );
                        } else {
                            return (
                                <>
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
