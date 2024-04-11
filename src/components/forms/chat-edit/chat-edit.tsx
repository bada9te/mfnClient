import { SubmitHandler, useForm } from "react-hook-form";
import { TextField, Button, Paper } from "@mui/material";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { useMutation, useReactiveVar } from "@apollo/client";
import { CHATS_USER_RELATED_BY_USER_ID_QUERY, CHAT_UPDATE_MUTATION } from "utils/graphql-requests/chats";
import { baseState } from "../../baseReactive";
import { emitChatUpdate } from "utils/socket/event-emitters/chats";
import { useChatUpdateMutation } from "utils/graphql-requests/generated/schema";


type Inputs = {
    Title: string;
}


export default function ChatEditForm(props: {
    selectedChatId: string;
}) {
    const { selectedChatId } = props;
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation("forms");
    const { user: currentUser } = useReactiveVar(baseState);

    const [ updateChat ] = useChatUpdateMutation();
    

    const onSubmit: SubmitHandler<Inputs>= async(data) => {
        enqueueSnackbar(t('battle.snack.pending'), { autoHideDuration: 1500 });
        
        await updateChat({
            variables: {
                input: { _id: selectedChatId, what: "title",  value: data.Title }
            },
            refetchQueries: [{query: CHATS_USER_RELATED_BY_USER_ID_QUERY, variables: { _id: currentUser._id }}]
        }).then(({data}) => {
            reset();
            enqueueSnackbar(t('chat_edit.snack.success'), {autoHideDuration: 1500, variant: 'success'});
            emitChatUpdate(data?.chatUpdate, data?.chatUpdate?.participants?.map(i => i?._id));
        }).catch(_ => {
            enqueueSnackbar(t('chat_edit.snack.error'), { autoHideDuration: 3000, variant: 'error' });
        }); 
    }

    return (
        <Paper component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{py: 1, px: 2, boxShadow: 10, borderRadius: 5}}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label={t('chat_edit.title')}
                error={Boolean(errors.Title)}
                helperText={errors.Title && t('chat_create.error.title')}
                {...register("Title", {
                    maxLength: 10,
                    minLength: 4,
                    required: true,
                })}
            />
           
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 1, mb: 2, boxShadow: 10 }}
            >
                {t('chat_edit.title.submit')}
            </Button>
        </Paper>
    );
}
