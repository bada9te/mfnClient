import { Button, Paper, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { USER_RESTORE_ACCOUNT_MUTATION } from "../../../utils/graphql-requests/users";
import { useTranslation } from "react-i18next";


const AccountRestoreForm = (props)=> {
    const { userId, actionId, verifyToken, type } = props;
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [ restoreAccount ] = useMutation(USER_RESTORE_ACCOUNT_MUTATION);
    const { t } = useTranslation("forms");

    const onSubmit = async(data) => {
        enqueueSnackbar(t('account_restore.snack.pending'), { autoHideDuration: 1500 });
        await restoreAccount({
            variables: {
                input: {
                    userId,
                    actionId,
                    verifyToken,
                    type,
                    newValue: data.newValue
                },
            },
        }).then(({ data }) => {
            navigate('/app/login');
            enqueueSnackbar(t('account_restore.snack.success'), { autoHideDuration: 1500, variant: 'success' });
        }).catch(err => {
            enqueueSnackbar(t('account_restore.snack.error'), { autoHideDuration: 3000, variant: 'error' });
        });
    }
    

    return(
        <Paper component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{py: 1, px: 2, boxShadow: 10, borderRadius: 5}}>
            {
                (() => {
                    if (type === "password") {
                        return (
                            <>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="password"
                                    label={t('account_restore.password')}
                                    name="password"
                                    type="password"
                                    error={Boolean(errors.Password)}
                                    helperText={errors.Password && t('account_restore.error.password')}
                                    {...register("newValue", {
                                        maxLength: 20,
                                        minLength: 8,
                                        required: true,
                                    })}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="confirm-password"
                                    label={t('account_restore.confirm_password')}
                                    name="password"
                                    type="password"
                                    error={Boolean(errors.ConfirmPassword)}
                                    helperText={errors.ConfirmPassword && t('account_restore.error.confirm_password')}
                                    {...register("ConfirmPassword", {
                                        required: t('account_restore.error.please_confirm_password'),
                                        validate: {
                                            matchesPreviousPassword: (value) => {
                                                const { newValue } = getValues();
                                                return newValue === value || t('account_restore.error.passwords_should_match');
                                            }
                                        }
                                    })}
                                />
                            </>
                        );
                    } else if (type === "email") {
                        return (
                            <>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label={t('account_restore.email')}
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    error={Boolean(errors.Email)}
                                    helperText={errors.Email && t('account_restore.error.email')}
                                    {...register("newValue", {
                                        required: true,
                                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                    })}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="confirm-email"
                                    label={t('account_restore.confirm_email')}
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    error={Boolean(errors.Email)}
                                    helperText={errors.Email && t('account_restore.error.email')}
                                    {...register("Email", {
                                        required: true,
                                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        validate: {
                                            matchesPreviousPassword: (value) => {
                                                const { newValue } = getValues();
                                                return newValue === value || t('account_restore.error.emails_should_match');
                                            }
                                        }
                                    })}
                                />
                            </>
                        );
                    }
                })()
            }
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, boxShadow: 10 }}>
                {t('account_restore.submit')}
            </Button>
        </Paper>    
    );
}

export default AccountRestoreForm;