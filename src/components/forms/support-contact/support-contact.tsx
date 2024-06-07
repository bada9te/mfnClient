import { SubmitHandler, useForm } from "react-hook-form";
import { TextField, Button, Paper } from "@mui/material";
import { useMutation, useReactiveVar } from "@apollo/client/index.js";
import { baseState } from "@/components/baseReactive";
import { SUPPORT_CONTACT_CREATE_MUTATION } from "@/utils/graphql-requests/support-contact";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";


type Inputs = {
    ContactReason: string;
    Email: string;
    Message: string;
}


export default function FormSupportContact() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
    const { user: currentUser } = useReactiveVar(baseState);
    const [createSupportRequest] = useMutation(SUPPORT_CONTACT_CREATE_MUTATION);
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation("forms");

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        enqueueSnackbar(t('support.snack.pending'), { autoHideDuration: 1500 });
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
            enqueueSnackbar(t('support.snack.success'), { autoHideDuration: 1500, variant: 'success' });
        }).catch(err => {
            enqueueSnackbar(t('support.snack.error'), { autoHideDuration: 3000, variant: 'error' });
        });
    }

    return (
        <Paper component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ py: 1, px: 2, borderRadius: 5, boxShadow: 10 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="contactReason"
                label={t('support.contact_reason')}
                autoFocus
                error={Boolean(errors.ContactReason)}
                helperText={errors.ContactReason && t('support.error.contact_reason')}
                {...register("ContactReason", {
                    required: true,
                })} 
            />
            <TextField
                defaultValue={currentUser?.local.email || ""}
                margin="normal"
                required
                fullWidth
                id="email"
                label={t('support.email')}
                autoComplete="email"
                autoFocus
                error={Boolean(errors.Email)}
                helperText={errors.Email && t('support.error.email')}
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
                label={t('support.message')}
                autoComplete="email"
                error={Boolean(errors.Message)}
                helperText={errors.Message && t('support.error.message')}
                {...register("Message", {
                    required: true,
                    minLength: 20,
                })}
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2, boxShadow: 10 }}
            >
                {t('support.submit')}
            </Button>
        </Paper>
    );
}
