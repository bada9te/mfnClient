import { Box, Button, TextField } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { prepareToRestore } from "./accountRestoreRequestFormSlice";
import * as Alert from "../../alerts/alerts";
import { useNavigate } from "react-router-dom";


const AccountRestoreRequestForm = (props)=> {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = data => {
        dispatch(prepareToRestore({email: data.Email, type: "password"}))
            .then(unwrapResult)
            .then(result => {
                if(result.data.done) {
                    const user = result.data.user;
                    if (user) {
                        Alert.alertSuccess('Check your email for next steps');
                        navigate('/login')
                    } else {
                        Alert.alertError('Account is not found');
                    }
                }
            });
    }
    

    return(
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
            <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Send the special link
            </Button>
        </Box>    
        </>
    );
}

export default AccountRestoreRequestForm;