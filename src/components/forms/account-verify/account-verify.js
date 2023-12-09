import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { USER_CONFIRM_ACCOUNT_MUTATION } from "../../../graphql-requests/users";


const AccountVerifyForm = (props)=> {
    const { userId, actionId } = props;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [ confirmAccount ] = useMutation(USER_CONFIRM_ACCOUNT_MUTATION);

    const onSubmit = async(data) => {
        enqueueSnackbar("Verifying...", { autoHideDuration: 1500 });
        await confirmAccount({
            variables: {
                input: {
                    userId,
                    actionId,
                    verifyToken: data.Code,
                },
            },
        }).then(({ data }) => {
            navigate('/app/login');
            enqueueSnackbar("Action verified", { autoHideDuration: 1500, variant: 'success' });
        }).catch(err => {
            enqueueSnackbar("Can't verify action", { autoHideDuration: 3000, variant: 'error' });
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
                sx={{ mt: 3, mb: 2, boxShadow: 10 }}
            >
                Verify
            </Button>
        </Box>    
        </>
    );
}

export default AccountVerifyForm;