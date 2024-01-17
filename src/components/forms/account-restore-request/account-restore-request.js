import { Button, Paper, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { USER_PREPARE_ACCOUNT_TO_RESTORE_MUTATION } from "../../../utils/graphql-requests/users";
import { useTranslation } from "react-i18next";


const AccountRestoreRequestForm = (props)=> {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [ makeAccountRestoreRequest ] = useMutation(USER_PREPARE_ACCOUNT_TO_RESTORE_MUTATION);
    const { t } = useTranslation("forms");

    const onSubmit = async(data) => {
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
                name="email"
                autoComplete="email"
                autoFocus
                error={Boolean(errors.Email)}
                helperText={errors.Email && t('account_restore_request.error.email')}
                {...register("Email", {
                    required: true,
                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, boxShadow: 10 }}>
                {t('account_restore_request.submit')}
            </Button>
        </Paper>    
    );
}

export default AccountRestoreRequestForm;