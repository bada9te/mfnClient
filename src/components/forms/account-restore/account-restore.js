import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { useSnackbar } from "notistack";


const AccountRestoreForm = (props)=> {
    const { userId, actionId, verifyToken, type } = props;
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { theme } = useReactiveVar(baseState);
    const { enqueueSnackbar } = useSnackbar();


    const onSubmit = data => {
        enqueueSnackbar("Updating account...", { autoHideDuration: 1500 });
        /*
        Alert.alertPromise("Updating account...", "Password updated", "Unexpected error", () => {
            return new Promise((resolve, reject) => {
                
                dispatch(restoreAccount({
                    userId,
                    actionId,
                    verifyToken,
                    newValue: data.newValue,
                    type: type,
                }))
                .then(unwrapResult)
                .then(result => {
                    if (result.data.done) {
                        navigate('/login');
                        resolve();
                    } else {
                        reject();
                    }
                });
                
            });
        }, { theme });
        */
        console.log("RESTORE");
    }
    

    return(
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{margin: 1}}>
            {
                (() => {
                    if (type === "password") {
                        return (
                            <>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="password"
                                    label="New password"
                                    name="password"
                                    type="password"
                                    error={Boolean(errors.Password)}
                                    helperText={errors.Password && "Password is not valid"}
                                    {...register("newValue", {
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
                                                const { newValue } = getValues();
                                                return newValue === value || "Passwords should match!";
                                            }
                                        }
                                    })}
                                />
                            </>
                        );
                    } else if (type === "email") {
                        return (
                            <>
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
                                    {...register("newValue", {
                                        required: true,
                                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                    })}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="confirm-email"
                                    label="Confirm email address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    error={Boolean(errors.Email)}
                                    helperText={errors.Email && "Email address is not valid"}
                                    {...register("Email", {
                                        required: true,
                                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        validate: {
                                            matchesPreviousPassword: (value) => {
                                                const { newValue } = getValues();
                                                return newValue === value || "Emails should match!";
                                            }
                                        }
                                    })}
                                />
                            </>
                        );
                    }
                })()
            }
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, boxShadow: 10 }}
            >
                Confirm
            </Button>
        </Box>    
    );
}

export default AccountRestoreForm;