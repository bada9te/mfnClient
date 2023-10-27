import { Box, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userSocket from "../../../socket/user/socket-user";
import EnumUserSelect from "../../enums/enum-user-select";
import { setIsShowing } from "../../modals/user-select-modal/userSelectModalSlice";
import { fetchUsers } from "./userSelectContainerSlice";



const UserSelectContainer = props => {
    const users = useSelector(state => state.userSelectContainer.users);
    const selectType = useSelector(state => state.userSelectContainer.selectType);
    const sharedItemId = useSelector(state => state.userSelectContainer.sharedItem);
    const currentUserId = useSelector(state => state.base.user._id);
    const dispatch = useDispatch();

    const handleUserSelect = (userId) => {
        if (selectType === 'postShare') {
            userSocket.emit("post-share", {
                receiver: userId,
                sender: currentUserId,
                post: sharedItemId,
                text: `Hey! Check this track!`,
            });
        }
        dispatch(setIsShowing(false));
    }

    // fetch
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch])
    

    return (
        <>
            {
                !users || users.length === 0 
                ?
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <Typography>
                        No subscribed on users yet
                    </Typography>
                </Box>
                :
                <Stack>
                    <EnumUserSelect userSelectionHandler={handleUserSelect}/>
                </Stack>
            }
        </>
    );
}

export default UserSelectContainer;