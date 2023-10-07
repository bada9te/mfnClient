import { useEffect } from "react";
import ProfileCard from "../../common/profile/profile-card/profile-card";
import PostItem from "../../common/post-item/post-item";
import getTimeSince from "../../../common-functions/getTimeSince";
import { SpinnerCircular } from "../../common/spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchInspectingPost } from "./trackContainerSlice";
import { Box } from "@mui/material";


const TrackContainer = (props) => {
    const {trackId} = props;

    const dispatch = useDispatch();
    const postData = useSelector(state => state?.trackContainer?.inspectingPost);
    const isLoading = useSelector(state => state?.trackContainer?.isLoading)
    const locations = useSelector(state => state?.base?.locations);


    useEffect(() => {
        dispatch(fetchInspectingPost(trackId))
    }, [trackId, dispatch]);

    return (
        <>
            {
                (() => {
                    if (isLoading || !postData) {
                        return (
                            <Box sx={{mt: 3, mb: 5, minHeight: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <SpinnerCircular/>
                            </Box>
                        );
                    } else {
                        return (
                            <Box sx={{ py: 3, display: 'flex', justifyContent: 'space-around', alignItems: 'center', boxShadow: 2}} flexWrap="wrap">
                                <PostItem 
                                    base={{
                                        ...postData, 
                                        ownerAvatar: `${locations?.images}/${postData.owner.avatar}`,
                                        createdAt: getTimeSince(new Date(postData.createdAt)) + ' ago',
                                        img: `${locations?.images}/${postData.image}`,
                                        audio: `${locations?.audios}/${postData.audio}`,
                                    }}
                                    addons={{
                                        commentsAllowed: postData.commentsAllowed,
                                        downloadsAllowed: postData.downloadsAllowed,
                                        status: null,
                                        profileLinkAccessable: true,
                                    }}
                                    id={postData._id}
                                    user={[
                                        postData.owner._id, 
                                        postData.owner.nick, 
                                        `${locations?.images}/${postData.owner.avatar}`,
                                    ]}
                                />
                                
                                <ProfileCard id={postData.owner._id} bgRadius={5}/>
                            </Box>
                        );
                    }
                })()
            }
        </>
    );
}

export default TrackContainer;