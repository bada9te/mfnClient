import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useReactiveVar } from "@apollo/client";
import { enqueueSnackbar } from "notistack";
import { userSelectContainerState } from "../../containers/user-select-container/reactive";
import UserSelectContainer from "../../containers/user-select-container/user-select-container";


const CreateChatForm = props => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { t } = useTranslation("forms");
    const { checked } = useReactiveVar(userSelectContainerState);

    const onSubmit = async(data) => {
        if (!checked.length) {
            enqueueSnackbar("No users selected", { autoHideDuration: 3000, variant: 'error' });
            return;
        }

        reset();
    }

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label={t('chat_create.title')}
                name="title"
                error={Boolean(errors.Title)}
                helperText={errors.Title && t('chat_create.error.title')}
                {...register("Title", {
                    maxLength: 10,
                    minLength: 4,
                    required: true,
                })}
            />

            <Box sx={{my: 2}}>
                <UserSelectContainer/>
            </Box>

            <Button type="submit" sx={{my: 1}} fullWidth variant="contained">Create</Button>
        </Box>
    );
}

export default CreateChatForm;