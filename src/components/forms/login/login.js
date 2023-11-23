import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import { httpLogin } from "../../../requests/auth";
import { baseState } from "../../baseReactive";
import { useSnackbar } from "notistack";
import SocialMediaLogin from "../../common/social-media-login/social-media-login";


const LoginForm = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
     
    const onSubmit = async(data) => {
        // show process
        enqueueSnackbar("Logging in...", { autoHideDuration: 1500 })
        // update store
        await httpLogin(data)
            .then(({ data }) => {
                if (data.done) {
                    if (data.user.verified) {
                        baseState({
                            ...baseState(),
                            user: data.user
                        });
                        navigate('/');
                        enqueueSnackbar("Successfully logged in", { variant: "success", autoHideDuration: 1500 });
                    } else {
                        enqueueSnackbar("Pls verify your account via email", { variant: "warning" });
                    }
                } else {
                    enqueueSnackbar("Can't perform login", { variant: "error" });
                }
            })
            .catch((err) => {
                enqueueSnackbar(err.message, { variant: "error" });
            });
    };

    
    return (
        <>  
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{margin: 1}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={Boolean(errors.Email)}
                    helperText={errors.Email && "Email address is not valid"}
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
                    label="Password"
                    name="password"
                    type="password"
                    error={Boolean(errors.Password)}
                    helperText={errors.Password && "Password is not valid"}
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
                    sx={{ mt: 3, mb: 2, boxShadow: 10 }}
                >
                    Sign In
                </Button>

                <SocialMediaLogin/>
            </Box>
        </>
    );
}


export default LoginForm;
