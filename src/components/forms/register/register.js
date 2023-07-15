import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { httpRegister } from "../../../requests/auth";
import { Box, TextField, Button } from "@mui/material";
import * as Alert from "../../alerts/alerts";


const RegisterForm = (props) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    
    const onSubmit = async(data) => {
        try {
            const result = await httpRegister(data);
    
            if (result.data.done) {
                navigate('/login');
                Alert.alertSuccess("Account " + result.data.user.email + " was successfully created");
            } else {
                Alert.alertError("Can't create the new account");
            }
        } catch (error) {
            Alert.alertError(error.response.data.error);
        }
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
                        required: true,
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
                    helperText={errors.Nickname && "Nickname is not valid"}
                    {...register("Nickname", {
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
                    helperText={errors.Password && "Password is not valid"}
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
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create account
                </Button>
            </Box>
        </>
    );
}

export default RegisterForm;

