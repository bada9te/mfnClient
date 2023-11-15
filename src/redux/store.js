import paginationSlice                from "../components/common/pagination/paginationSlice";
import postsContainerSlice            from "../components/containers/posts-container/postsContainerSlice";
import battlesContainerSlice          from "../components/containers/battles-container/battlesContainerSlice";
import leftBarPostsSlice              from "../components/bars/left/left-bar-posts/leftBarPostsSlice";
import rightBarUsersSlice             from "../components/bars/right/right-bar-users/rightBarUsersSlice";
import postSelectContainerSlice       from "../components/containers/post-select-container/postSelectContainerSlice";
import postSelectModalSlice           from "../components/modals/post-select-modal/postSelectModalSlice";
import imageCropperModalSlice         from "../components/modals/image-cropper-modal/imageCropperModalSlice";
import postUploadFormSlice            from "../components/forms/post-upload/postUploadFormSlice";
import profileCardFormSlice           from "../components/forms/profile-card/profileCardFormSlice";
import notificationsContainerSlice    from "../components/containers/notifications-container/notificationsContainerSlice";
import createBattleFormSlice          from "../components/forms/create-battle/createBattleFormSlice";
import accountRestoreFormSlice        from "../components/forms/account-restore/accountRestoreFormSlice";
import accountRestoreRequestFormSlice from "../components/forms/account-restore-request/accountRestoreRequestFormSlice";
import accountVerifyFormSlice         from "../components/forms/account-verify/accountVerifyFormSlice";
import playlistsContainerSlice        from "../components/containers/playlists-container/playlistsContainerSlice";
import createPlaylistFormSlice        from "../components/forms/create-playlist/createPlaylistFormSlice";
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer: {
        // common 
        leftBarPosts:           leftBarPostsSlice,
        rightBarUsers:          rightBarUsersSlice,
        pagination:             paginationSlice,
        
        // containers
        postsContainer:         postsContainerSlice,
        battlesContainer:       battlesContainerSlice,
        postSelectContainer:    postSelectContainerSlice,
        notificationsContainer: notificationsContainerSlice,
        playlistsContainer:     playlistsContainerSlice,
        
        // forms
        createBattleForm:          createBattleFormSlice,
        postUploadForm:            postUploadFormSlice,
        profileCardForm:           profileCardFormSlice,
        accountRestoreForm:        accountRestoreFormSlice,
        accountRestoreRequestForm: accountRestoreRequestFormSlice,
        accountVerifyForm:         accountVerifyFormSlice,
        createPlaylistForm:        createPlaylistFormSlice,

        // modals
        postSelectModal:        postSelectModalSlice,
        imageCropperModal:      imageCropperModalSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    devTools: process.env.REACT_APP_VERSION_TYPE === "production" ? false : true,
});

// action creators
//const actionCreators = bindActionCreators(actions, store.dispatch)


export {
    store,
};