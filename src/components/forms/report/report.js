import { useForm } from "react-hook-form";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import * as Alert from "../../alerts/alerts";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { httpCreateReport } from "../../../requests/reports";
import { setIsShowing as setReportModalIsShowing } from "../../modals/report-modal/reportModalSlice";



const ReportForm = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [value, setValue] = useState("");
    const reportingItemId = useSelector(state => state.reportForm.reportingItemId);
    const currentUser = useSelector(state => state.base.user);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        console.log(event.target)
        setValue(event.target.value);
    };
    
    const onSubmit = async(data) => {
        await httpCreateReport({
            contactReason: data.FoulType,
            email: currentUser.email,
            message: data.Message || "Not provided",
            reportOwner: currentUser._id,
            reportedPost: reportingItemId, 
        }).then(result => {
            if (result.data.done) {
                Alert.alertSuccess('Report sent');
                dispatch(setReportModalIsShowing(false));
            } else {
                Alert.alertError("Can't send a report");
            }
        }).catch(_ => {
            Alert.alertError("Can't send a report");
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
                    sx={{ mt: 3, mb: 2 }}
                >
                    Report
                </Button>
            </Box>
        </>
    );
}

export default ReportForm;

