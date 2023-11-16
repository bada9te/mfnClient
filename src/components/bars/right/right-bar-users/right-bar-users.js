import { Box, Drawer, IconButton, TextField, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import RightBarUsersContainer from "../../../containers/rightbar-users-container/rightbar-users-container";
import { useReactiveVar } from "@apollo/client";
import { bottomBarState } from "../../bottom/bottom-bar/reactive";
import { useState } from "react";


const RightBarUsers = (props) => {
    const [searchQuery, setSearchQuery] = useState("");
    const bottomBar = useReactiveVar(bottomBarState);

    const handleInput = (query) => {
        setSearchQuery(query);
    }
    
    const closeRB = () => {
        bottomBarState({ ...bottomBar, showRB: false, value: '' });
    }

    return (
        <Drawer
            anchor="right"
            open={bottomBar.showRB}
            onClose={closeRB}
            keepMounted
            elevation={3}
        >
            <Box sx={{
                pt: '70px',
                zIndex: 1,
                boxShadow: 5
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
            
            <RightBarUsersContainer searchQuery={searchQuery}/>
        </Drawer>
    );
}

export default RightBarUsers;