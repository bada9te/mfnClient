import { useForm } from "react-hook-form";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import { useState } from "react";
import { useMutation, useReactiveVar } from "@apollo/client";
import { reportFormState } from "./reactive";
import { baseState } from "../../baseReactive";
import { useSnackbar } from "notistack";
import { REPORT_CREATE_MUTATION } from "../../../graphql-requests/reports";


const ReportForm = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ value, setValue ] = useState("");
    const { reportingItemId } = useReactiveVar(reportFormState);
    const { user: currentUser } = useReactiveVar(baseState);
    const [ createReport ] = useMutation(REPORT_CREATE_MUTATION);
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    
    const onSubmit = async(data) => {
        enqueueSnackbar("Reporting...", { autoHideDuration: 1500 });
        await createReport({
            variables: {
                input: {
                    contactReason: data.FoulType,
                    email: currentUser.email !== "" ? currentUser.email : "Not provided",
                    message: data.Message || "Not provided",
                    reportedPost: reportingItemId,
                },
            },
        }).then(({ data }) => {
            enqueueSnackbar("Report was sent", { autoHideDuration: 1500, variant: 'success' })
        }).catch(err => {
            enqueueSnackbar("Can't create the report", { autoHideDuration: 3000, variant: 'error' });
        });
    }

    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{margin: 1}}>
                <TextField
                    select
                    fullWidth
                    defaultValue={value}
                    label="Select"
                    onChange={handleChange}
                    
                    error={Boolean(errors.FoulType)}
                    helperText={errors.FoulType && "This option is required"}
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
                    label="Describe the foul in details (optional)"
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
                    Report
                </Button>
            </Box>
        </>
    );
}

export default ReportForm;

