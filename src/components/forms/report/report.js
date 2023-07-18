import { useForm } from "react-hook-form";
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import * as Alert from "../../alerts/alerts";
import { useState } from "react";


const ReportForm = (props) => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    
    const onSubmit = async(data) => {
        console.log(data)
    }

    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{margin: 1}}>
                <FormControl>
                    <InputLabel id="simple-select-label">Foul type</InputLabel>
                    <Select
                        labelId="simple-select-label"
                        id="simple-select"
                        value={value}
                        label="Foul type"
                        onChange={handleChange}
                    >
                        <MenuItem value={"Copyright infringement"}>Copyright infringement</MenuItem>
                        <MenuItem value={"Propaganda of violence"}>Propaganda of violence</MenuItem>
                        <MenuItem value={"Propaganda of fascism" }>Propaganda of fascism</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    multiline
                    margin="normal"
                    required
                    fullWidth
                    id="message"
                    label="Describe the violation in details (optional)"
                    name="message"
                    autoComplete="email"
                    error={Boolean(errors.Message)}
                    helperText={errors.Message && "Violation details are not valid"}
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

