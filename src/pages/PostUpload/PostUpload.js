import PostUploadForm from "../../components/forms/post-upload/post-upload";
import PostItem from "../../components/common/post-item/post-item";
import ImageCropperModal from "../../components/modals/image-cropper-modal/image-cropper-modal";
import { Stack, Card, Typography, CardContent, Box } from "@mui/material";
import ImageRightFormContainer from "../../components/containers/image-right-form-container/image-right-form.container";
import { useDispatch, useSelector } from "react-redux";
import { setIsShowing as setCropModalIsShowing } from "../../components/modals/image-cropper-modal/imageCropperModalSlice";
import { setPicture } from "../../components/forms/post-upload/postUploadFormSlice";
import newPostFormBG from '../../images/bgs/newPostFormBG.png';


const PostUpload = (props) => {
    const currentUser = useSelector(state => state?.base?.user);
    const locations = useSelector(state => state?.base?.locations);
    const isShowing = useSelector(state => state.imageCropperModal.isShowing);
    const audio = useSelector(state => state.postUploadForm.audio);
    const title = useSelector(state => state.postUploadForm.title);
    const description = useSelector(state => state.postUploadForm.description);
    const picture = useSelector(state => state.postUploadForm.picture);
    const commentsAllowed = useSelector(state => state.postUploadForm.commentsAllowed);
    const downloadsAllowed = useSelector(state => state.postUploadForm.downloadsAllowed);
    const dispatch = useDispatch();


    const handleImageCropModalClose = (value, picture) => {
        dispatch(setCropModalIsShowing(value));
        if (picture !== null) {
            dispatch(setPicture(picture));
        }
    }


    return (
        <ImageRightFormContainer bg={newPostFormBG}>
            {
                isShowing
                ? 
                <ImageCropperModal 
                    show={isShowing} 
                    handleImageCropModalClose={handleImageCropModalClose} 
                    image={picture} 
                    what={'post-image'}
                />
                :
                null
            }
                <Box sx={{width: '40rem', height: 'fit-content', boxShadow: 0, borderRadius: 5}}>
                    <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 3, mb: 0}}>
                        Your new post
                    </Typography>
                    <Box sx={{
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        mt: 3, 
                        p: 1,
                        maxWidth: {xs: '375px', md: '100%'},
                    }}>
                        <PostItem
                            base={{
                                owner: {
                                    _id: currentUser?._id,
                                    nick: currentUser?.nick,
                                },
                                ownerAvatar: `${locations?.images}/${currentUser?.avatar}`,
                                createdAt: 'now',
                                title,
                                description,
                                img: picture,
                                audio,
                                likedBy: [],
                                savedBy: [],
                                comments: [],
                            }}
                            addons={{
                                commentsAllowed,
                                downloadsAllowed,
                                status: "upload",
                                profileLinkAccessable: false,
                            }}
                            id={null}
                        />
                    </Box>
                    <CardContent>
                        <PostUploadForm/>
                    </CardContent>
                </Box>
        </ImageRightFormContainer>
    );
}

export default PostUpload;

//<Stack spacing={{ xs: 1, sm: 2 }} sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}} direction="row" useFlexGap flexWrap="wrap">