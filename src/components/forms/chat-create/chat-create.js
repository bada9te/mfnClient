import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useReactiveVar } from "@apollo/client";
import { enqueueSnackbar } from "notistack";
import { userSelectContainerState } from "../../containers/user-select-container/reactive";
import UserSelectContainer from "../../containers/user-select-container/user-select-container";
import { CHATS_USER_RELATED_BY_USER_ID_QUERY, CHAT_CREATE_MUTATION } from "../../../utils/graphql-requests/chats";
import { baseState } from "../../baseReactive";
import { chatCreateModalState } from "../../modals/chat-create-modal/reactive";


const CreateChatForm = props => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { t } = useTranslation("forms");
    const { user: currentUser } = useReactiveVar(baseState);
    const { checked } = useReactiveVar(userSelectContainerState);
    const [ createChat ] = useMutation(CHAT_CREATE_MUTATION);

    const onSubmit = async(data) => {
        if (!checked.length) {
            enqueueSnackbar("No users selected", { autoHideDuration: 3000, variant: 'error' });
            return;
        }

        enqueueSnackbar("Creating chat...", { autoHideDuration: 1500 });
        await createChat({
            variables: {
                input: {
                    title: data.Title,
                    owner: currentUser._id,
                    participants: [currentUser._id, ...checked]
                }
            },
            refetchQueries: [{query: CHATS_USER_RELATED_BY_USER_ID_QUERY, variables: { _id: currentUser._id }}]
        }).then(_ => {
            enqueueSnackbar("Chat created.", { autoHideDuration: 1500, variant: 'success' });
            chatCreateModalState({ ...chatCreateModalState(), isShowing: false });
            reset();
        }).catch(_ => {
            enqueueSnackbar("Can't create chat.", { autoHideDuration: 3000, variant: 'error' });
        });
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
                <UserSelectContainer except={[]} includeChats={false}/>
            </Box>

            <Button type="submit" sx={{my: 1}} fullWidth variant="contained">Create</Button>
        </Box>
    );
}

export default CreateChatForm;