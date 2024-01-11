import { useForm } from "react-hook-form";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import { useState } from "react";
import { useMutation, useReactiveVar } from "@apollo/client";
import { reportFormState } from "./reactive";
import { baseState } from "../../baseReactive";
import { useSnackbar } from "notistack";
import { REPORT_CREATE_MUTATION } from "../../../graphql-requests/reports";
import { useTranslation } from "react-i18next";


const ReportForm = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ value, setValue ] = useState("");
    const { reportingItemId } = useReactiveVar(reportFormState);
    const { user: currentUser } = useReactiveVar(baseState);
    const [ createReport ] = useMutation(REPORT_CREATE_MUTATION);
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation("forms");

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    
    const onSubmit = async(data) => {
        enqueueSnackbar(t('report.snack.pending'), { autoHideDuration: 1500 });
        await createReport({
            variables: {
                input: {
                    contactReason: data.FoulType,
                    email: currentUser.base.email !== "" ? currentUser.base.email : "Not provided",
                    message: data.Message || "Not provided",
                    reportedPost: reportingItemId,
                },
            },
        }).then(({ data }) => {
            enqueueSnackbar(t('report.snack.success'), { autoHideDuration: 1500, variant: 'success' })
        }).catch(err => {
            enqueueSnackbar(t('report.snack.error'), { autoHideDuration: 3000, variant: 'error' });
        });
    }

    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{margin: 1}}>
                <TextField
                    select
                    fullWidth
                    defaultValue={value}
                    label={t('report.foul_type')}
                    onChange={handleChange}
                    
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
                    name="message"
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
                    sx={{ mt: 3, mb: 2, boxShadow: 10 }}
                >
                    {t('report.submit')}
                </Button>
            </Box>
        </>
    );
}

export default ReportForm;

