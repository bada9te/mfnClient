import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { useSnackbar } from "notistack";


const AccountRestoreRequestForm = (props)=> {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { theme } = useReactiveVar(baseState);
    const { enqueueSnackbar } = useSnackbar();
 
    const onSubmit = data => {
        enqueueSnackbar("Requesting...", { autoHideDuration: 1500 });
        /*
        Alert.alertPromise("Requesting...", "Check your email for next steps", "Account is not found", () => {
            return new Promise((resolve, reject) => {
                
                dispatch(prepareToRestore({email: data.Email, type: "password"}))
                    .then(unwrapResult)
                    .then(result => {
                        if(result.data.done) {
                            const user = result.data.user;
                            if (user) {
                                navigate('/login')
                                resolve();
                            } else {
                                reject();
                            }
                        }
                    });
                
                });
            }, { theme });
            */
            console.log("PREPARE TO RESTORE!")
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