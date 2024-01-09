import { Box, IconButton, Drawer, Typography, TextField, Paper } from "@mui/material"
import { Close } from "@mui/icons-material";
import LeftBarPostsContainer from "../../../containers/leftbar-posts-container/leftbar-posts-container";
import { useReactiveVar } from "@apollo/client";
import { bottomBarState } from "../../bottom/bottom-bar/reactive";
import { useState } from "react";
import { useTranslation } from "react-i18next";


const LeftBarPosts = (props) => {
    const [searchQuery, setSearchQuery] = useState("");
    const bottomBar = useReactiveVar(bottomBarState);
    const { t } = useTranslation("bars");

    const handleInput = (query) => {
        setSearchQuery(query);
    }
    
    const closeLB = () => {
        bottomBarState({ ...bottomBar, showLB: false, value: '' });
    }

    return (
        <Drawer anchor="left" open={bottomBar.showLB} onClose={closeLB} keepMounted elevation={3} 
        PaperProps={{ sx: { background: 'none' } }}>
            <Paper sx={{ pt: '70px', zIndex: 1, boxShadow: 5 }} elevation={3}>
                <Box sx={{p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="h6">{t('leftbar.header')}</Typography>
                    <IconButton onClick={closeLB}>
                        <Close/>
                    </IconButton>
                </Box>
                <Box sx={{px: 1.5, pb: 1}}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="track-title"
                        label={t('leftbar.label')}
                        name="track-title"
                        type="text"
                        onInput={(e) => handleInput(e.target.value)}
                    />
                </Box>
            </Paper>
            
            <LeftBarPostsContainer searchQuery={searchQuery}/>
        </Drawer>
    );
}


export default LeftBarPosts;
