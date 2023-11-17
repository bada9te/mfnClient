import { useForm } from "react-hook-form";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import * as Alert from "../../alerts/alerts";
import { useState } from "react";
import { httpCreateReport } from "../../../requests/reports";
import { reportModalState } from "../../modals/report-modal/reactive";
import { useReactiveVar } from "@apollo/client";
import { reportFormState } from "./reactive";
import { baseState } from "../../baseReactive";



const ReportForm = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [value, setValue] = useState("");
    const { reportingItemId } = useReactiveVar(reportFormState);
    const { user: currentUser, theme } = useReactiveVar(baseState);

    const handleChange = (event) => {
        console.log(event.target)
        setValue(event.target.value);
    };
    
    const onSubmit = async(data) => {
        Alert.alertPromise("Sending report...", "Report sent", "Can't send a report", () => {
            return new Promise(async(resolve, reject) => {
                await httpCreateReport({
                    contactReason: data.FoulType,
                    email: currentUser.email !== "" ? currentUser.email : "Not provided",
                    message: data.Message || "Not provided",
                    reportedPost: reportingItemId, 
                    ...(currentUser._id !== "" && {reportOwner: currentUser._id})
                }).then(result => {
                    if (result.data.done) {
                        reportModalState({ ...reportModalState(), isShowing: false });
                        resolve();
                    } else {
                        reject();
                    }
                }).catch(_ => {
                    reject();
                });
            })
        }, { theme })
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

