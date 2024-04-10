import { Button, Paper, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { useUserConfirmAccountMutation } from "utils/graphql-requests/generated/schema";


type Inputs = {
    Code: string;
}


export default function AccountVerifyForm(props: {
    userId: string;
    actionId: string;
}) {
    const { userId, actionId } = props;
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [ confirmAccount ] = useUserConfirmAccountMutation();
    const { t } = useTranslation("forms");

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        enqueueSnackbar(t('account_verify.snack.pending'), { autoHideDuration: 1500 });
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
            enqueueSnackbar(t('account_verify.snack.success'), { autoHideDuration: 1500, variant: 'success' });
        }).catch(err => {
            enqueueSnackbar(t('account_verify.snack.error'), { autoHideDuration: 3000, variant: 'error' });
        });
    }
    

    return(
        <Paper component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{py: 1, px: 2, boxShadow: 10, borderRadius: 5}}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="code"
                label={t('account_verify.code')}
                error={Boolean(errors.Code)}
                helperText={errors.Code && t('account_verify.error.code')}
                {...register("Code", {
                    maxLength: 20,
                    required: true,
                })} 
            />
            <Button
                type="submit"
                fullWidth
                color="secondary"
                sx={{ mt: 3, mb: 2, boxShadow: 10 }}
            >
                {t('account_verify.submit')}
            </Button>
        </Paper>    
    );
}
