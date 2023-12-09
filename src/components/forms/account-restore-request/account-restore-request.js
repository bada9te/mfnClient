import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { USER_PREPARE_ACCOUNT_TO_RESTORE_MUTATION } from "../../../graphql-requests/users";


const AccountRestoreRequestForm = (props)=> {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [ makeAccountRestoreRequest ] = useMutation(USER_PREPARE_ACCOUNT_TO_RESTORE_MUTATION);
 
    const onSubmit = async(data) => {
        enqueueSnackbar("Requesting...", { autoHideDuration: 1500 });
        await makeAccountRestoreRequest({
            variables: {
                input: {
                    email: data.Email,
                    type: "password",
                },
            },
        }).then(({ data }) => {
            navigate('/app/login');
            enqueueSnackbar("Check your email for next steps", { autoHideDuration: 3000, variant: 'info' });
        }).catch(err => {
            enqueueSnackbar("User was not found", { autoHideDuration: 3000, variant: 'error' });
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
                    sx={{ mt: 3, mb: 2, boxShadow: 10 }}
                >
                    Send the special link
            </Button>
        </Box>    
        </>
    );
}

export default AccountRestoreRequestForm;