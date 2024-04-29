import { Button, Paper, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { useUserPrepareAccountToRestoreMutation } from "utils/graphql-requests/generated/schema";


type Inputs = {
    Email: string;
}


export default function AccountRestoreRequestForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [ makeAccountRestoreRequest ] = useUserPrepareAccountToRestoreMutation();
    const { t } = useTranslation("forms");

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        enqueueSnackbar(t('account_restore_request.snack.pending'), { autoHideDuration: 1500 });
        await makeAccountRestoreRequest({
            variables: {
                input: {
                    email: data.Email,
                    type: "password",
                },
            },
        }).then(({ data }) => {
            navigate('/app/login');
            enqueueSnackbar(t('account_restore_request.snack.success'), { autoHideDuration: 3000, variant: 'info' });
        }).catch(err => {
            enqueueSnackbar(t('account_restore_request.snack.error'), { autoHideDuration: 3000, variant: 'error' });
        });
    }
    

    return(
        <Paper component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ py: 1, px: 2, boxShadow: 10, borderRadius: 5 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t('account_restore_request.email')}
                autoComplete="email"
                autoFocus
                error={Boolean(errors.Email)}
                helperText={errors.Email && t('account_restore_request.error.email')}
                {...register("Email", {
                    required: true,
                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })}
            />
            <Button type="submit" color="secondary" fullWidth variant="contained" sx={{ mt: 3, mb: 2, boxShadow: 10 }}>
                {t('account_restore_request.submit')}
            </Button>
        </Paper>    
    );
}
