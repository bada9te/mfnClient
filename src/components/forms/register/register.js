import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import SocialMediaLogin from "../../common/social-media-login/social-media-login";
import { httpRegister } from "../../../requests/auth";



const RegisterForm = (props) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const { enqueueSnackbar } = useSnackbar();
    
    const onSubmit = async(data) => {
        enqueueSnackbar("Trying to register new account...", { autoHideDuration: 1500 });
        await httpRegister({
            email: data.Email,
            password: data.Password,
            nick: data.Nickname
        }).then(({ data }) => {
            navigate('/login');
            enqueueSnackbar("Account " + data.userCreate.email + " was successfully created", { autoHideDuration: 3000, variant: "success" });
        }).catch(err => {
            enqueueSnackbar("Can't create the new account", { autoHideDuration: 3000, variant: "error" });
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
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={Boolean(errors.Email)}
                        helperText={errors.Email && "Email address is not valid"}
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
                        label="Nickname"
                        name="nickname"
                        error={Boolean(errors.Nickname)}
                        helperText={errors.Nickname && "Nickname must be from 4 to 20 characters"}
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
                        label="Password"
                        name="password"
                        type="password"
                        error={Boolean(errors.Password)}
                        helperText={errors.Password && "Password must be from 8 to 20 characters"}
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
                        label="Confirm password"
                        name="password"
                        type="password"
                        error={Boolean(errors.ConfirmPassword)}
                        helperText={errors.ConfirmPassword && "Confirmination password is not valid"}
                        {...register("ConfirmPassword", {
                            required: "Please confirm password!",
                            validate: {
                                matchesPreviousPassword: (value) => {
                                    const { Password } = getValues();
                                    return Password === value || "Passwords should match!";
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
                        Create account
                </Button>

                <SocialMediaLogin/>
            </Box>
        </>
    );
}

export default RegisterForm;

