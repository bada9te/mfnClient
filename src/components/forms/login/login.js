import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Alert from "../../alerts/alerts";
import { Box, TextField, Button } from "@mui/material";
import { login } from "../../baseSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from '@reduxjs/toolkit';



const LoginForm = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    
    const onSubmit = async(data) => {
        dispatch(login(data))
        .then(unwrapResult)
        .then((result) => {
            if (result.data.done) {
                if (result.data.user.verified) {
                    localStorage.setItem('mfnCurrentUser', JSON.stringify({
                        id: result.data.user._id, 
                        email: result.data.user.email, 
                        theme: 'light',
                    }));
                    localStorage.setItem('mfnCurrentToken', JSON.stringify(result.data.token))
                    navigate('/');
                    Alert.alertSuccess("Successfully logged in");
                } else {
                    Alert.alertWarning("Pls verify your account via email");
                }
            } else {
                Alert.alertError("Can't log in");
            }
        })
        .catch((err) => {
            Alert.alertError(err.message);
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
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
            </Box>
        </>
    );
}


export default LoginForm;
