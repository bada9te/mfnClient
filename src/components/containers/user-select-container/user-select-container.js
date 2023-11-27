import { useQuery, useReactiveVar } from "@apollo/client";
import { Box, Stack, Typography } from "@mui/material";
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
    const userSelectModal = useReactiveVar(userSelectModalState);


    const handleUserSelect = (userId) => {
        if (selectType === 'postShare') {
            console.log('POST_SHARE');
            /*
            userSocket.emit("post-share", {
                receiver: userId,
                sender: currentUser._id,
                post: sharedItemId,
                text: `Hey! Check this track!`,
            });
            */
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