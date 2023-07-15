import { Outlet } from "react-router-dom";
import Topbar from "../../components/bars/top/top-bar/top-bar";
import BottomBar from "../../components/bars/bottom/bottom-bar/bottom-bar";
import { memo } from "react";

import './Container.scss';
import AudioPlayer from "../../components/common/audio-player/audio-player";
import LeftBarPosts from "../../components/bars/left/left-bar-posts/left-bar-posts";
import RightBarUsers from "../../components/bars/right/right-bar-users/right-bar-users";
//import './swipe-handler';



const Container = (props) => {

    return (
        <>
            <Topbar text="Music From Nothing" username="UserName" where="feed"/>
            <LeftBarPosts/>
            <RightBarUsers/>
            <div className="container-fluid position-fixed">
                <div className="row d-flex justfy-content-center">
                    <div className="dynamic-column col-md-12 p-0 anim0 overflow-auto">
                        <Outlet/>
                    </div>     
                </div>
            </div>
            <AudioPlayer/>
            <BottomBar/>
        </>
    );
}

export default memo(Container);