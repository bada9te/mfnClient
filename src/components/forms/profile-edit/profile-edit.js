import { useForm }        from "react-hook-form";
import { Box, Card, CardContent, Typography, Button, TextField, Avatar } from "@mui/material";
import EmailImage    from "../../../images/icons/email.png"
import PasswordImage from "../../../images/icons/password.png"
import TextImage     from "../../../images/icons/text.png"
import ClearImage     from "../../../images/icons/logo_clear.png"
import { Delete } from "@mui/icons-material";
import { confirmContainerState } from "../../containers/confirm-container/reactive";
import { confirmModalState } from "../../modals/confirm-modal/reactive";
import { useMutation, useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { useSnackbar } from "notistack";
import { USER_PREPARE_ACCOUNT_TO_RESTORE_MUTATION, USER_UPDATE_MUTATION } from "../../../graphql-requests/users";
import { useTranslation } from "react-i18next";


const FormProfileEdit = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { title } = props;
    const { user: currentUser } = useReactiveVar(baseState);
    const { enqueueSnackbar } = useSnackbar();
    const [ updateUser ] = useMutation(USER_UPDATE_MUTATION);
    const [ prepareToRestore ] = useMutation(USER_PREPARE_ACCOUNT_TO_RESTORE_MUTATION);
    const { t } = useTranslation("forms");

    // form submit
    const onSubmit = async(data) => {
        const keys = Object.keys(data);
        switch (keys.at(keys.length - 1)) {
            case "NewNickname":
                enqueueSnackbar(t('profile.snack.nick.pending'), { autoHideDuration: 1500 });
                await updateUser({
                    variables: {
                        input: { _id: currentUser._id, what: "nick", value: data.NewNickname },
                    },
                }).then(() => {
                    dispatchUser("nick", data.NewNickname);
                    enqueueSnackbar(t('profile.snack.nick.success'), { autoHideDuration: 1500 });
                }).catch(err => {
                    enqueueSnackbar(t('profile.snack.nick.error'), { autoHideDuration: 1500 });
                });
                break;
            case "NewDescription":
                enqueueSnackbar(t('profile.snack.description.pending'), { autoHideDuration: 1500 });
                await updateUser({
                    variables: {
                        input: { _id: currentUser._id, what: "description", value: data.NewDescription,},
                    },
                }).then(() => {
                    dispatchUser("description", data.NewDescription);
                    enqueueSnackbar(t('profile.snack.description.success'), { autoHideDuration: 1500, variant: 'success' });
                }).catch(err => {
                    enqueueSnackbar(t('profile.snack.description.error'), { autoHideDuration: 3000, variant: 'error' });
                });
                break;
            case "OldPassword":
                enqueueSnackbar(t('profile.snack.password.pending'), { autoHideDuration: 1500 });
                await prepareToRestore({
                    variables: {
                        input: { email: currentUser.email, type: "password" },
                    },
                }).then(({ data }) => {
                    enqueueSnackbar(t('profile.snack.password.success'), { autoHideDuration: 3000, variant: 'info' })
                }).catch(err => {
                    enqueueSnackbar(t('profile.snack.password.error'), { autoHideDuration: 3000, variant: 'error' });
                });
                break;
            case "OldEmail":
                enqueueSnackbar(t('profile.snack.email.pending'), { autoHideDuration: 1500 });
                if (data.OldEmail !== currentUser.email) {
                    enqueueSnackbar(t('profile.snack.email.error_match'), { autoHideDuration: 3000, variant: 'error' });
                } else {
                    await prepareToRestore({
                        variables: {
                            input: { email: currentUser.email, type: "email" },
                        },
                    }).then(({ data }) => {
                        enqueueSnackbar(t('profile.snack.email.success'), { autoHideDuration: 3000, variant: 'info' });
                    }).catch(err => {
                        enqueueSnackbar(t('profile.snack.email.error'), { autoHideDuration: 3000, variant: 'error' })
                    });
                }
                break;
            default:
                break;
        }
    }

    const dispatchUser = (what, value) => {
        baseState({
            ...baseState(),
            user: {
                ...currentUser,
                [what]: value,
            },
        });
    }

    const handleAccountDelete = async() => {
        confirmModalState({ ...confirmModalState(), isShowing: true });
        confirmContainerState({ 
            ...confirmContainerState(), 
            actionType: "delete-account", 
            text: "By confirming this, you agree that your account will be removed without any ability to restore.",
            title: "Confirm account deletion",
        });
    } 

    return (
            <Card sx={{ width: '20rem', height: 'fit-content', boxShadow: 3, borderRadius: 5 }}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2}}>
                    { title === "Password"    ? <Avatar src={PasswordImage} alt="password" sx={{ m: 1, boxShadow: 5 }}/>  : null }
                    { title === "Nickname"    ? <Avatar src={TextImage} alt="nickname" sx={{ m: 1, boxShadow: 5 }}/> : null }
                    { title === "Description" ? <Avatar src={TextImage} alt="description" sx={{ m: 1, boxShadow: 5 }}/> : null }
                    { title === "Email"       ? <Avatar src={EmailImage} alt="email" sx={{ m: 1, boxShadow: 5 }}/> : null }
                    { title === "Danger_zone" ? <Avatar src={ClearImage} alt="email" sx={{ m: 1, boxShadow: 5 }}/> : null }
                </Box>
                <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 2, mb: 0}}>
                    {t(`profile.${title.toLowerCase()}`)}
                </Typography>
                <CardContent>
                    <Box component="form" sx={{mx: 2}} onSubmit={handleSubmit(onSubmit)}>
                        { 
                            title === "Password" 
                            &&  
                            <TextField margin="normal" required fullWidth id="password" label={t('profile.current_password')} name="password" type="password"
                                error={Boolean(errors.OldPassword)}
                                helperText={errors.OldPassword && t('profile.error.passwor')}
                                {...register("OldPassword", {
                                    maxLength: 20,
                                    minLength: 8,
                                    required: true,
                                })} 
                            />
                        }
                        { 
                            title === "Nickname"
                            &&
                            <TextField margin="normal" required fullWidth id="nickname"label={t('profile.nickname')} name="nickname" type="text"
                                error={Boolean(errors.NewNickname)}
                                helperText={errors.NewNickname && t('profile.error.nickname')}
                                {...register("NewNickname", {
                                    maxLength: 20,
                                    minLength: 4,
                                    required: true,
                                })} 
                            />
                        }
                        { 
                            title === "Description"
                            &&
                            <TextField margin="normal" required fullWidth id="newDescription" label={t('profile.description')} name="newDescription" type="text"
                                error={Boolean(errors.NewDescription)}
                                helperText={errors.NewNickname && t('profile.error.description"')}
                                {...register("NewDescription", {
                                    maxLength: 20,
                                    minLength: 4,
                                    required: true,
                                })} 
                            />
                        }
                        { 
                            title === "Email"
                            &&
                            <TextField margin="normal" required fullWidth id="oldEmail" label={t('profile.current_email')} name="oldEmail" type="text"
                                error={Boolean(errors.OldEmail)}
                                helperText={errors.OldEmail && t('profile.error.email')}
                                {...register("OldEmail", {
                                    required: true,
                                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                })}
                            />
                        }
                        { 
                            title === "Danger_zone" 
                            &&
                            <Button color="error" variant="contained" startIcon={<Delete/>} onClick={handleAccountDelete} fullWidth>
                                Delete account
                            </Button>
                        }

                        {
                            title !== "Danger_zone" 
                            &&
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 1, boxShadow: 10 }}
                            >
                                Change { title.toLowerCase() }
                            </Button>
                        }
                    </Box>
                </CardContent>
            </Card>
    );
}



export default FormProfileEdit;
