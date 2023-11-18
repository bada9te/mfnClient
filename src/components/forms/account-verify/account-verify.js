import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { useSnackbar } from "notistack";


const AccountVerifyForm = (props)=> {
    const { userId, actionId } = props;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { theme } = useReactiveVar(baseState);
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = data => {
        enqueueSnackbar("Verifying...", { autoHideDuration: 1500 });
        /*
        Alert.alertPromise("Verifying...", "Account verified", "Can't verify this account", () => {
            return new Promise((resolve, reject) => {
                /*
                dispatch(verifyAccount({
                    userId: userId,
                    actionId: actionId,
                    verifyToken: data.Code,
                }))
                .then(unwrapResult)
                .then(result => {
                    if (result.data.done && result.data.user?.verified) {
                        navigate('/login');
                        resolve();
                    } else {
                        reject();
                    }
                });
                
            })
        }, { theme })
        */
       console.log("VERIFY");
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
                sx={{ mt: 3, mb: 2, boxShadow: 10 }}
            >
                Verify
            </Button>
        </Box>    
        </>
    );
}

export default AccountVerifyForm;