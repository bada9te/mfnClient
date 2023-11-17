import { useForm } from "react-hook-form";
import { Box, TextField, Button } from "@mui/material";
import * as Alert from "../../alerts/alerts";
import { httpCreateSupportRequest } from "../../../requests/support-requests";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";


const FormSupportContact = (props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { user: currentUser } = useReactiveVar(baseState);

    const onSubmit = async(data) => {
        const supportRequestData = {
            contactReason: data.ContactReason,
            email: data.Email,
            message: data.Message,
        };

        Alert.alertPromise("Sending support request...", "Successfully sent", "Sth went wrong", () => {
            return new Promise(async(resolve, reject) => {
                const result = await httpCreateSupportRequest(supportRequestData);
                if (result.data.done) {
                    reset();
                    resolve();
                } else {
                    reject();
                }
            })
        })
    }

    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{p: 2}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="contactReason"
                    label="Contact reason"
                    name="contactReason"
                    autoFocus
                    error={Boolean(errors.ContactReason)}
                    helperText={errors.ContactReason && "Contact reason is not specified"}
                    {...register("ContactReason", {
                        required: true,
                    })} 
                />
                <TextField
                    defaultValue={currentUser?.email || ""}
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
                    multiline
                    margin="normal"
                    required
                    fullWidth
                    id="message"
                    label="Describe your problem in details"
                    name="message"
                    autoComplete="email"
                    error={Boolean(errors.Message)}
                    helperText={errors.Message && "Message is not valid"}
                    {...register("Message", {
                        required: true,
                        minLength: 20,
                    })}
                />

                <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, boxShadow: 10 }}
                    >
                        Confirm
                </Button>
            </Box>
        </>
    );
}

export default FormSupportContact;