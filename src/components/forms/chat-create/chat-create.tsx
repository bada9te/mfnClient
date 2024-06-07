import { Box, Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useReactiveVar } from "@apollo/client/index.js";
import { enqueueSnackbar } from "notistack";
import { userSelectContainerState } from "../../containers/user-select-container/reactive";
import UserSelectContainer from "../../containers/user-select-container/user-select-container";
import { CHATS_USER_RELATED_BY_USER_ID_QUERY } from "@/utils/graphql-requests/chats";
import { baseState } from "../../baseReactive";
import { chatCreateModalState } from "../../modals/chat-create-modal/reactive";
import { emitChatCreate } from "@/utils/socket/event-emitters/chats";
import { useChatCreateMutation } from "@/utils/graphql-requests/generated/schema";


type Inputs = {
    Title: string;
}


export default function CreateChatForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
    const { t } = useTranslation("forms");
    const { user: currentUser } = useReactiveVar(baseState);
    const { checked } = useReactiveVar(userSelectContainerState);
    const [ createChat ] = useChatCreateMutation();

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
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
                    participants: [currentUser._id, ...checked.map(i => i._id)]
                }
            },
            refetchQueries: [{query: CHATS_USER_RELATED_BY_USER_ID_QUERY, variables: { _id: currentUser._id }}]
        }).then(({data}) => {
            enqueueSnackbar("Chat created.", { autoHideDuration: 1500, variant: 'success' });
            chatCreateModalState({ ...chatCreateModalState(), isShowing: false });
            emitChatCreate(data?.chatCreate, data?.chatCreate?.participants?.map(i => i?._id));
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

            <Button type="submit" color="secondary" sx={{my: 1}} fullWidth variant="contained">Create</Button>
        </Box>
    );
}