import { Box, IconButton, Drawer, Typography, TextField } from "@mui/material"
import { Close } from "@mui/icons-material";
import LeftBarPostsContainer from "../../../containers/leftbar-posts-container/leftbar-posts-container";
import { useDispatch, useSelector } from "react-redux";
import { setShowLB, setValue } from "../../bottom/bottom-bar/bottomBarSlice";
import { setSearchQuery } from "./leftBarPostsSlice";


const LeftBarPosts = (props) => {
    const dispatch = useDispatch();
    const showLB = useSelector(state => state.bottomBar.showLB);

    const handleInput = (query) => {
        dispatch(setSearchQuery(query));
    }
    
    const closeLB = () => {
        dispatch(setShowLB(false));
        dispatch(setValue(''));
    }

    return (
        <Drawer
            anchor="left"
            open={showLB}
            onClose={closeLB}
            keepMounted
        >
            <Box sx={{
                pt: '70px',
                zIndex: 1,
                boxShadow: 1
                }}
            >
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
