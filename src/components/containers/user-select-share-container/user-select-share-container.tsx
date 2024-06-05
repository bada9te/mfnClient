import { Button } from "@mui/material";
import UserSelectContainer from "../user-select-container/user-select-container";
import { userSelectModalState } from "@/components/modals/user-select-modal/reactive";
import { useMutation, useReactiveVar } from "@apollo/client";
import { baseState } from "@/components/baseReactive";
import { userSelectContainerState } from "../user-select-container/reactive";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { CHAT_MESSAGE_CREATE_MUTATION } from "@/utils/graphql-requests/chat-messages";


export default function UserSelectContainerShare () {
    const { user: currentUser } = useReactiveVar(baseState);
    const userSelectModal = useReactiveVar(userSelectModalState);
    const { selectType, sharedItem: sharedItemId, checked } = useReactiveVar(userSelectContainerState);
    const { t } = useTranslation("containers");

    const { enqueueSnackbar } = useSnackbar();

    // confirm selection
    const [ createMessage ] = useMutation(CHAT_MESSAGE_CREATE_MUTATION);
    const handleUserAndChatsSelect = () => {
        enqueueSnackbar(t('select.user.snack.pending'), { autoHideDuration: 1500 });
        if (!checked.length) {
            enqueueSnackbar(t('select.user.snack.error'), { autoHideDuration: 3000, variant: 'error' })
            return;
        }

        const promises: (() => void)[] = [];
        if (selectType === 'postShare') {
            checked.forEach(({ _id, __typename }) => {
                promises.push(() => {
                    const input: {
                        owner: string;
                        sharedItemId: string;
                        toUser?: string;
                        chat?: string;
                    } = {
                        owner: currentUser._id,
                        sharedItemId,
                    };

                    if (__typename === "User") {
                        input.toUser = _id;
                    }

                    if (__typename === "Chat") {
                        input.chat = _id;
                    }
                    
                    createMessage({
                        variables: { input }
                    });
                });
            });
        }

        Promise.all(promises)
            .then(() => {
                enqueueSnackbar(t('select.user.snack.success'), { autoHideDuration: 1500, variant: 'success' });
            }).catch(() => {
                enqueueSnackbar(t('select.user.snack.error'), { autoHideDuration: 3000, variant: 'error' });
            });
        userSelectModalState({ ...userSelectModal, isShowing: false })
    }

    return (
        <>
            <UserSelectContainer except={[]} includeChats/>
            <Button variant="contained" fullWidth onClick={handleUserAndChatsSelect}>Confirm</Button>
        </>
    );
};