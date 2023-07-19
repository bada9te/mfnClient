import { Outlet } from "react-router-dom";
import Topbar from "../../components/bars/top/top-bar/top-bar";
import BottomBar from "../../components/bars/bottom/bottom-bar/bottom-bar";
import { memo } from "react";

import './Container.scss';
import AudioPlayer from "../../components/common/audio-player/audio-player";
import LeftBarPosts from "../../components/bars/left/left-bar-posts/left-bar-posts";
import RightBarUsers from "../../components/bars/right/right-bar-users/right-bar-users";
import { Box } from "@mui/material";



const Container = (props) => {

    return (
        <>
            <Topbar text="Music From Nothing" username="UserName" where="feed"/>
            <LeftBarPosts/>
            <RightBarUsers/>
                <Box sx={{pb: 10}}>
                    <Outlet/>
                </Box>
            <AudioPlayer/>
            <BottomBar/>
        </>
    );
}

export default memo(Container);