import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Paper } from "@mui/material";
import { httpLogin } from "../../../utils/http-requests/auth";
import { useSnackbar } from "notistack";
import SocialMediaLogin from "../../common/social-media-login/social-media-login";
import { useTranslation } from "react-i18next";


const LoginForm = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation("forms");
     
    const onSubmit = async(data) => {
        // show process
        enqueueSnackbar(t('login.snack.pending'), { autoHideDuration: 1500 })
        // update store
        await httpLogin(data.Email, data.Password)
            .then(({ data }) => {
                navigate('/app/');
                enqueueSnackbar(`${t('login.snack.success')} ${data.nick}`, { variant: "success", autoHideDuration: 3000 });
            }).catch((err) => {
                enqueueSnackbar(err.response.data, { variant: "error" });
            });
    };

    
    return (
        <Paper component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ py: 1, px: 2, borderRadius: 5, boxShadow: 10 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t('login.email')}
                name="email"
                autoComplete="email"
                autoFocus
                error={Boolean(errors.Email)}
                helperText={errors.Email && t('login.error.email')}
                {...register("Email", {
                    required: true,
                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })}
            />

            <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label={t('login.password')}
                name="password"
                type="password"
                error={Boolean(errors.Password)}
                helperText={errors.Password && t('login.error.password')}
                {...register("Password", {
                    maxLength: 20,
                    minLength: 8,
                    required: true,
                })}
            />
            
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2, boxShadow: 10 }}
            >
                {t('login.submit')}
            </Button>

            <SocialMediaLogin/>
        </Paper>
    );
}


export default LoginForm;
