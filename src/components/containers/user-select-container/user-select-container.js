import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { Box, Stack, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { CREATE_NOTIFICATION_MUTATION } from "../../../utils/graphql-requests/notifications";
import { USERS_BY_IDS_QUERY } from "../../../utils/graphql-requests/users";
import { baseState } from "../../baseReactive";
import EnumUserSelect from "../../enums/enum-user-select";
import { userSelectModalState } from "../../modals/user-select-modal/reactive";
import { userSelectContainerState } from "./reactive";
import { useTranslation } from "react-i18next";
 

const UserSelectContainer = props => {
    const { user: currentUser } = useReactiveVar(baseState);
    const { selectType, sharedItem: sharedItemId } = useReactiveVar(userSelectContainerState);
    const { data } = useQuery(USERS_BY_IDS_QUERY, {
        variables: {
            ids: currentUser.subscribedOn,
        },
    });
    const [ createPostShareNotification ] = useMutation(CREATE_NOTIFICATION_MUTATION)
    const userSelectModal = useReactiveVar(userSelectModalState);
    const { t } = useTranslation("containers");


    const handleUserSelect = (userId) => {
        if (selectType === 'postShare') {
            enqueueSnackbar(t('select.user.snack.pending'), { autoHideDuration: 1500 });
            createPostShareNotification({
                variables: {
                    input: {
                        receiver: userId,
                        sender: currentUser._id,
                        post: sharedItemId,
                        text: 'Hey! Check this track!',
                    }
                }
            }).then(() => {
                enqueueSnackbar(t('select.user.snack.success'), { autoHideDuration: 1500, variant: 'success' });
            }).catch(() => {
                enqueueSnackbar(t('select.user.snack.error'), { autoHideDuration: 3000, variant: 'error' });
            });
        }
        userSelectModalState({ ...userSelectModal, isShowing: false })
    }
    

    return (
        <>
            {
                !data?.usersByIds || data?.usersByIds.length === 0 
                ?
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <Typography>
                        {t('select.user.not_found')}
                    </Typography>
                </Box>
                :
                <Stack>
                    <EnumUserSelect userSelectionHandler={handleUserSelect} users={data.usersByIds}/>
                </Stack>
            }
        </>
    );
}

export default UserSelectContainer;