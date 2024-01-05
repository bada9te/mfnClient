import { useForm } from "react-hook-form";
import { Box, TextField, Button } from "@mui/material";
import { useMutation, useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { SUPPORT_CONTACT_CREATE_MUTATION } from "../../../graphql-requests/support-contact";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";


const FormSupportContact = (props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { user: currentUser } = useReactiveVar(baseState);
    const [createSupportRequest] = useMutation(SUPPORT_CONTACT_CREATE_MUTATION);
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation("support");

    const onSubmit = async(data) => {
        enqueueSnackbar("Creating support request...", { autoHideDuration: 1500 });
        await createSupportRequest({
            variables: {
                input: {
                    contactReason: data.ContactReason,
                    email: data.Email,
                    message: data.Message,
                }
            }
        }).then(({data}) => {
            reset();
            enqueueSnackbar("Support request created", { autoHideDuration: 1500, variant: 'success' });
        }).catch(err => {
            enqueueSnackbar("Can't create the request", { autoHideDuration: 3000, variant: 'error' });
        });
    }

    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{p: 2}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="contactReason"
                    label={t('support.form.contact_reason')}
                    name="contactReason"
                    autoFocus
                    error={Boolean(errors.ContactReason)}
                    helperText={errors.ContactReason && t('support.form.error.contact_reason')}
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
                    label={t('support.form.email')}
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={Boolean(errors.Email)}
                    helperText={errors.Email && t('support.form.error.email')}
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
                    label={t('support.form.message')}
                    name="message"
                    autoComplete="email"
                    error={Boolean(errors.Message)}
                    helperText={errors.Message && t('support.form.error.message')}
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
                        {t('support.form.submit')}
                </Button>
            </Box>
        </>
    );
}

export default FormSupportContact;