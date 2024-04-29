import passwordImage from '../assets/icons/password.png';
import AccountRestoreForm from '../components/forms/account-restore/account-restore'
import { Avatar, Box, CardActions, CardContent, Typography, Stack, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import LogRegVerContainer from '../components/containers/image-left-form-conatiner/image-left-form-container';
import newPasswordBG from '../assets/bgs/newPasswordFormBG.png';
import { useMutation, useQuery } from '@apollo/client';
import { MODERATION_ACTION_DELETE_MUTATION, MODERATION_ACTION_VALIDATE_QUERY } from '../utils/graphql-requests/moderation-actions';
import { useSnackbar } from 'notistack';
import { SpinnerCircular } from '../components/common/spinner/Spinner';
import { Cancel } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';


export default function AccountRestore() {
    const { userId, actionId, verifyToken, type } = useParams();
    const { t } = useTranslation("pages");
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
                verifyToken,
                type,
            }
        }
    });

    const cancelAccountRestore = () => {
        deleteModerationAction()
            .then(({ data }) => {
                enqueueSnackbar(t('account_restore.snack.success'), { autoHideDuration: 3000, variant: 'info' });
                navigate('/app/login');
            }).catch(err => {
                enqueueSnackbar(t('account_restore.snack.error'), { autoHideDuration: 3000, variant: 'error' });
            });
    }


    return(
        <LogRegVerContainer bg={newPasswordBG} text={`${t('account_restore.main_text')} ${type}`}>
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
                                        {t('account_restore.validating')}
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
                                        {t('account_restore.ready_to_restore')}
                                    </Typography>
                                    <CardContent>
                                        <AccountRestoreForm userId={userId as string} actionId={actionId as string} verifyToken={verifyToken as string} type={type as string}/>
                                    </CardContent>

                                    <CardActions>
                                        <Stack direction="column" spacing={0.75} mx={1.5} mb={1.5}>
                                            <Button 
                                                sx={{ width: 'fit-content', boxShadow: 10 }}
                                                startIcon={<Cancel/>}
                                                variant='contained' 
                                                onClick={cancelAccountRestore}
                                            >
                                                {t('account_restore.cancel')}
                                            </Button>
                                        </Stack>
                                    </CardActions>
                                </>
                            );
                        } else {
                            return (
                                <>
                                    <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', textAlign:'center', pt: 2, mb: 0}}>
                                        {t('account_restore.error.validation')}
                                    </Typography>
                                    <CardContent>
                                        <Typography textAlign={'center'}>{t('account_restore.error.text')}</Typography>
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

