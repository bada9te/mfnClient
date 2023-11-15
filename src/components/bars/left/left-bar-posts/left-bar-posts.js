import { Box, IconButton, Drawer, Typography, TextField } from "@mui/material"
import { Close } from "@mui/icons-material";
import LeftBarPostsContainer from "../../../containers/leftbar-posts-container/leftbar-posts-container";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "./leftBarPostsSlice";
import { useReactiveVar } from "@apollo/client";
import { bottomBarState } from "../../bottom/bottom-bar/reactive";


const LeftBarPosts = (props) => {
    const dispatch = useDispatch();
    const bottomBar = useReactiveVar(bottomBarState);

    const handleInput = (query) => {
        dispatch(setSearchQuery(query));
    }
    
    const closeLB = () => {
        bottomBarState({ ...bottomBar, showLB: false, value: '' });
    }

    return (
        <Drawer
            anchor="left"
            open={bottomBar.showLB}
            onClose={closeLB}
            keepMounted
            elevation={3}
        >
            <Box sx={{
                pt: '70px',
                zIndex: 1,
                boxShadow: 5
            }}>
                <Box sx={{p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="h6">Search for tracks</Typography>
                    <IconButton onClick={closeLB}>
                        <Close/>
                    </IconButton>
                </Box>
                <Box sx={{px: 1.5, pb: 1}}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="track-title"
                        label="Track title"
                        name="track-title"
                        type="text"
                        onInput={(e) => handleInput(e.target.value)}
                    />
                </Box>
            </Box>
            
            <LeftBarPostsContainer/>
        </Drawer>
    );
}


export default LeftBarPosts;
