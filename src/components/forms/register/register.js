import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Paper } from "@mui/material";
import { useSnackbar } from "notistack";
import SocialMediaLogin from "../../common/social-media-login/social-media-login";
import { httpRegister } from "../../../utils/http-requests/auth";
import { useTranslation } from "react-i18next";



const RegisterForm = (props) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation("forms");

    const onSubmit = async(data) => {
        enqueueSnackbar(t('register.snack.pending'), { autoHideDuration: 1500 });
        await httpRegister({
            email: data.Email,
            password: data.Password,
            nick: data.Nickname
        }).then(({ data }) => {
            navigate('/app/login');
            enqueueSnackbar(`${t('register.snack.success1')} ${data.local.email} ${t('register.snack.success2')}`, { autoHideDuration: 3000, variant: "success" });
        }).catch(err => {
            enqueueSnackbar(err.response.data, { autoHideDuration: 3000, variant: "error" });
        });
    }

    return (
        <Paper component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ py: 1, px: 2, borderRadius: 5, boxShadow: 10 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t('register.email')}
                name="email"
                autoComplete="email"
                autoFocus
                error={Boolean(errors.Email)}
                helperText={errors.Email && t('register.error.email')}
                {...register("Email", {
                    required: t('register.error.provide_email'),
                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="nickname"
                label={t('register.nick')}
                name="nickname"
                error={Boolean(errors.Nickname)}
                helperText={errors.Nickname && t('register.error.nick')}
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
                label={t('register.password')}
                name="password"
                type="password"
                error={Boolean(errors.Password)}
                helperText={errors.Password && t('register.error.password')}
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
                label={t('register.repeat_password')}
                name="password"
                type="password"
                error={Boolean(errors.ConfirmPassword)}
                helperText={errors.ConfirmPassword && t('register.error.repeat_password')}
                {...register("ConfirmPassword", {
                    required: t('register.error.confirm_password'),
                    validate: {
                        matchesPreviousPassword: (value) => {
                            const { Password } = getValues();
                            return Password === value || t('register.error.passwords_should_match');
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
                {t('register.submit')}
        </Button>
        <SocialMediaLogin/>
    </Paper>
    );
}

export default RegisterForm;

