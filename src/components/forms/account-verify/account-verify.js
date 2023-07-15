import { Box, Button, TextField } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as Alert from "../../alerts/alerts";
import { useNavigate } from "react-router-dom";
import { verifyAccount } from "./accountVerifyFormSlice";


const AccountVerifyForm = (props)=> {
    const { userId, actionId } = props;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onSubmit = data => {
        dispatch(verifyAccount({
            userId: userId,
            actionId: actionId,
            verifyToken: data.Code,
        }))
        .then(unwrapResult)
        .then(result => {
            if (result.data.done && result.data.user?.verified) {
                Alert.alertSuccess('Account verified');
                navigate('/login');
            } else {
                Alert.alertError("Can't verify account");
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
                id="code"
                label="Code"
                name="code"
                error={Boolean(errors.Nickname)}
                helperText={errors.Nickname && "Code is not valid"}
                {...register("Code", {
                    maxLength: 20,
                    required: true,
                })} 
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Verify
            </Button>
        </Box>    
        </>
    );
}

export default AccountVerifyForm;