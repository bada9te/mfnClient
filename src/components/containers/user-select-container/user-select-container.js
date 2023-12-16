import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { Box, Stack, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { CREATE_NOTIFICATION_MUTATION } from "../../../graphql-requests/notifications";
import { USERS_BY_IDS_QUERY } from "../../../graphql-requests/users";
import { baseState } from "../../baseReactive";
import EnumUserSelect from "../../enums/enum-user-select";
import { userSelectModalState } from "../../modals/user-select-modal/reactive";
import { userSelectContainerState } from "./reactive";



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


    const handleUserSelect = (userId) => {
        if (selectType === 'postShare') {
            enqueueSnackbar("Sharing selected track...", { autoHideDuration: 1500 });
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
                enqueueSnackbar("Track was sent!", { autoHideDuration: 1500, variant: 'success' });
            }).catch(() => {
                enqueueSnackbar("Can't share this track.", { autoHideDuration: 3000, variant: 'error' });
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
                        No subscribed on users yet
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