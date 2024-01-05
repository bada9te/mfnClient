import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import SocialMediaLogin from "../../common/social-media-login/social-media-login";
import { httpRegister } from "../../../http-requests/auth";
import { useTranslation } from "react-i18next";



const RegisterForm = (props) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation("register");

    const onSubmit = async(data) => {
        enqueueSnackbar("Trying to register new account...", { autoHideDuration: 1500 });
        await httpRegister({
            email: data.Email,
            password: data.Password,
            nick: data.Nickname
        }).then(({ data }) => {
            navigate('/app/login');
            enqueueSnackbar("Account " + data.userCreate.email + " was successfully created", { autoHideDuration: 3000, variant: "success" });
        }).catch(err => {
            enqueueSnackbar(err.response.data, { autoHideDuration: 3000, variant: "error" });
        });
    }

    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{margin: 1}}>
                
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={t('register.form.email')}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={Boolean(errors.Email)}
                        helperText={errors.Email && t('register.form.error.email')}
                        {...register("Email", {
                            required: "Pls provide your email address",
                            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="nickname"
                        label={t('register.form.nick')}
                        name="nickname"
                        error={Boolean(errors.Nickname)}
                        helperText={errors.Nickname && t('register.form.error.nick')}
                        {...register("Nickname", {
                            minLength: 4,
                            maxLength: 20,
                            required: true,
                        })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label={t('register.form.password')}
                        name="password"
                        type="password"
                        error={Boolean(errors.Password)}
                        helperText={errors.Password && t('register.form.error.password')}
                        {...register("Password", {
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
                        label={t('register.form.repeat_password')}
                        name="password"
                        type="password"
                        error={Boolean(errors.ConfirmPassword)}
                        helperText={errors.ConfirmPassword && t('register.form.error.repeat_password')}
                        {...register("ConfirmPassword", {
                            required: "Please confirm password!",
                            validate: {
                                matchesPreviousPassword: (value) => {
                                    const { Password } = getValues();
                                    return Password === value || t('register.form.error.passwords_should_match');
                                }
                            }
                        })}
                    />
                
                <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, boxShadow: 10 }}
                    >
                        {t('register.form.submit')}
                </Button>

                <SocialMediaLogin/>
            </Box>
        </>
    );
}

export default RegisterForm;

