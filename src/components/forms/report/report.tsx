import { SubmitHandler, useForm } from "react-hook-form";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import { useReactiveVar } from "@apollo/client/index.js";
import { reportFormState } from "./reactive";
import { baseState } from "../../baseReactive";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { useReportCreateMutation } from "@/utils/graphql-requests/generated/schema";


type Inputs = {
    FoulType: string;
    Message: string;
}


export default function ReportForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const { reportingItemId } = useReactiveVar(reportFormState);
    const { user: currentUser } = useReactiveVar(baseState);
    const [ createReport ] = useReportCreateMutation();
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation("forms");

    
    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        enqueueSnackbar(t('report.snack.pending'), { autoHideDuration: 1500 });
        await createReport({
            variables: {
                input: {
                    contactReason: data.FoulType,
                    email: currentUser.local?.email !== "" ? currentUser.local.email : "Not provided",
                    message: data.Message || "Not provided",
                    reportedPost: reportingItemId,
                },
            },
        }).then(_ => {
            enqueueSnackbar(t('report.snack.success'), { autoHideDuration: 1500, variant: 'success' })
        }).catch(_ => {
            enqueueSnackbar(t('report.snack.error'), { autoHideDuration: 3000, variant: 'error' });
        });
    }

    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{margin: 1}}>
                <TextField
                    select
                    fullWidth
                    defaultValue={"Copyright infringement"}
                    label={t('report.foul_type')}
                    
                    error={Boolean(errors.FoulType)}
                    helperText={errors.FoulType && t('report.error.foul_type')}
                    {...register("FoulType", {
                        required: true,
                    })}
                >
                    <MenuItem value={"Copyright infringement"}>Copyright infringement</MenuItem>
                    <MenuItem value={"Propaganda of violence"}>Propaganda of violence</MenuItem>
                    <MenuItem value={"Propaganda of fascism" }>Propaganda of fascism</MenuItem>
                </TextField>
                
                <TextField
                    multiline
                    margin="normal"
                    fullWidth
                    id="message"
                    label={t('report.message')}
                    error={Boolean(errors.Message)}
                    helperText={errors.Message && errors.Message.type === "minLength" && <span>Min length must be 10</span>}
                    {...register("Message", {
                        required: false,
                        minLength: 10,
                    })}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 3, mb: 2, boxShadow: 10 }}
                >
                    {t('report.submit')}
                </Button>
            </Box>
        </>
    );
}
