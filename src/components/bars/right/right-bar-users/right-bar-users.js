import { Box, Drawer, IconButton, TextField, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import RightBarUsersContainer from "../../../containers/rightbar-users-container/rightbar-users-container";
import { useDispatch, useSelector } from "react-redux";
import { setShowRB, setValue } from "../../bottom/bottom-bar/bottomBarSlice";
import { setSearchQuery } from "./rightBarUsersSlice";


const RightBarUsers = (props) => {
    const dispatch = useDispatch();
    const showRB = useSelector(state => state.bottomBar.showRB);

    const handleInput = (query) => {
        dispatch(setSearchQuery(query));
    }
    
    const closeRB = () => {
        dispatch(setShowRB(false));
        dispatch(setValue(''));
    }

    return (
        <Drawer
            anchor="right"
            open={showRB}
            onClose={closeRB}
            keepMounted
        >
            <Box sx={{
                pt: '70px',
                zIndex: 1,
                boxShadow: 1
                }}
            >
                <Box sx={{p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="h6">Search for users</Typography>
                    <IconButton onClick={closeRB}>
                        <Close/>
                    </IconButton>
                </Box>
                <Box sx={{px: 1.5, pb: 1}}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="user-nickname"
                        label="Nickname"
                        name="nickname"
                        type="text"
                        onInput={(e) => handleInput(e.target.value)}
                    />
                </Box>
            </Box>
            
            <RightBarUsersContainer/>
        </Drawer>
    );
}

export default RightBarUsers;