import baseSlice                      from "../components/baseSlice";
import paginationSlice                from "../components/common/pagination/paginationSlice";
import postsContainerSlice            from "../components/containers/posts-container/postsContainerSlice";
import battlesContainerSlice          from "../components/containers/battles-container/battlesContainerSlice";
import bottomBarSlice                 from "../components/bars/bottom/bottom-bar/bottomBarSlice";
import trackContainerSlice            from "../components/containers/track-container/trackContainerSlice";
import leftBarPostsSlice              from "../components/bars/left/left-bar-posts/leftBarPostsSlice";
import rightBarUsersSlice             from "../components/bars/right/right-bar-users/rightBarUsersSlice";
import leftBarPostsContainerSlice     from "../components/containers/leftbar-posts-container/leftBarPostsContainerSlice";
import rightBarUsersContainerSlice    from "../components/containers/rightbar-users-container/rightBarUsersContainerSlice";
import commentsContainerSlice         from "../components/containers/comments-container/commentsContainerSlice";
import postSelectContainerSlice       from "../components/containers/post-select-container/postSelectContainerSlice";
import postSelectModalSlice           from "../components/modals/post-select-modal/postSelectModalSlice";
import commentsModalSlice             from "../components/modals/comments-modal/commentsModalSlice";
import imageCropperModalSlice         from "../components/modals/image-cropper-modal/imageCropperModalSlice";
import postUploadFormSlice            from "../components/forms/post-upload/postUploadFormSlice";
import profileCardFormSlice           from "../components/forms/profile-card/profileCardFormSlice";
import profileCardSlice               from "../components/common/profile/profile-card/profileCardSlice";
import notificationsContainerSlice    from "../components/containers/notifications-container/notificationsContainerSlice";
import audioPlayerSlice               from "../components/common/audio-player/audioPlayerSlice";
import createBattleFormSlice          from "../components/forms/create-battle/createBattleFormSlice";
import userSelectModalSlice           from "../components/modals/user-select-modal/userSelectModalSlice";
import userSelectContainerSlice       from "../components/containers/user-select-container/userSelectContainerSlice";
import accountRestoreFormSlice        from "../components/forms/account-restore/accountRestoreFormSlice";
import accountRestoreRequestFormSlice from "../components/forms/account-restore-request/accountRestoreRequestFormSlice";
import accountVerifyFormSlice         from "../components/forms/account-verify/accountVerifyFormSlice";
import reportModalSlice               from "../components/modals/report-modal/reportModalSlice";
import reportFormSlice                from "../components/forms/report/reportFormSlice";
import confirmModalSlice              from "../components/modals/confirm-modal/confirmModalSlice";
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer: {
        // common 
        base:                   baseSlice, 
        bottomBar:              bottomBarSlice,
        leftBarPosts:           leftBarPostsSlice,
        rightBarUsers:          rightBarUsersSlice,
        pagination:             paginationSlice,
        profileCard:            profileCardSlice,
        audioPlayer:            audioPlayerSlice,
        
        // containers
        postsContainer:         postsContainerSlice,
        battlesContainer:       battlesContainerSlice,
        trackContainer:         trackContainerSlice,
        leftBarPostsContainer:  leftBarPostsContainerSlice,
        rightBarUsersContainer: rightBarUsersContainerSlice,
        commentsContainer:      commentsContainerSlice,
        postSelectContainer:    postSelectContainerSlice,
        notificationsContainer: notificationsContainerSlice,
        userSelectContainer:    userSelectContainerSlice,
        
        // forms
        createBattleForm:          createBattleFormSlice,
        postUploadForm:            postUploadFormSlice,
        profileCardForm:           profileCardFormSlice,
        accountRestoreForm:        accountRestoreFormSlice,
        accountRestoreRequestForm: accountRestoreRequestFormSlice,
        accountVerifyForm:         accountVerifyFormSlice,
        reportForm:                reportFormSlice,

        // modals
        postSelectModal:        postSelectModalSlice,
        commentsModal:          commentsModalSlice,
        imageCropperModal:      imageCropperModalSlice,
        userSelectModal:        userSelectModalSlice,
        reportModal:            reportModalSlice,
        confirmModal:           confirmModalSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    devTools: process.env.REACT_APP_VERSION_TYPE === "production" ? false : true,
});

// action creators
//const actionCreators = bindActionCreators(actions, store.dispatch)


export {
    store,
};