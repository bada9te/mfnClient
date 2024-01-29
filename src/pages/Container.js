import { Outlet } from "react-router-dom";
import Topbar from "../components/bars/top/top-bar/top-bar";
import BottomBar from "../components/bars/bottom/bottom-bar/bottom-bar";
import { memo } from "react";

//import './Container.scss';
import AudioPlayer from "../components/common/audio-player/audio-player";
import LeftBarPosts from "../components/bars/left/left-bar-posts/left-bar-posts";
import RightBarUsers from "../components/bars/right/right-bar-users/right-bar-users";
import { Box, CssBaseline } from "@mui/material";
import ConfirmModal from "../components/modals/confirm-modal/confirm-modal";
import UserSelectModal from "../components/modals/user-select-modal/user-select-modal";
import CommentsModal from "../components/modals/comments-modal/comments-modal";
import ReportsModal from "../components/modals/report-modal/report-modal";
import PostSelectModal from "../components/modals/post-select-modal/post-select-modal";
import LanguageSelectModal from "../components/modals/language-select-modal/language-select-modal";
import ChatCreateModal from "../components/modals/chat-create-modal/chat-create-modal";



const Container = (props) => {

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* MODALS */}
            <ConfirmModal/>
            <UserSelectModal/>
            <CommentsModal/>
            <ReportsModal/>
            <PostSelectModal/>
            <LanguageSelectModal/>
            <ChatCreateModal/>

            {/* BARS */}
            <LeftBarPosts/>
            <RightBarUsers/>

            {/* PAGES OUTLET */}
            <Topbar text="Music From Nothing" username="UserName" where="feed"/>
            <Box sx={{width: '100%', pt: 8}}>
                <Outlet/>
            </Box>

            <BottomBar/>
            <AudioPlayer/>
        </Box>
    );
}

export default memo(Container);