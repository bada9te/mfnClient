import PostUploadForm from "../../components/forms/post-upload/post-upload";
import PostItem from "../../components/common/post-item/post-item";
import ImageCropperModal from "../../components/modals/image-cropper-modal/image-cropper-modal";
import { Typography, CardContent, Box } from "@mui/material";
import ImageRightFormContainer from "../../components/containers/image-right-form-container/image-right-form.container";
import newPostFormBG from '../../images/bgs/newPostFormBG.png';
import BaseContentContainer from "../../components/containers/base-content-container/base-content-container";
import { imageCropperModalState } from "../../components/modals/image-cropper-modal/reactive";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../../components/baseReactive";
import { postUploadFormState } from "../../components/forms/post-upload/reactive";
import { useTranslation } from "react-i18next";


const PostUpload = (props) => {
    const { user: currentUser, locations } = useReactiveVar(baseState);
    const { isShowing, audio, title, description,  picture, commentsAllowed, downloadsAllowed } = useReactiveVar(postUploadFormState);
    const { t } = useTranslation("pages");

    const handleImageCropModalClose = (value, picture) => {
        imageCropperModalState({ ...imageCropperModalState(), isShowing: value })
        if (picture !== null) {
            postUploadFormState({ ...postUploadFormState(), picture });
        }
    }


    return (
        <BaseContentContainer>
            <ImageRightFormContainer bg={newPostFormBG} text={t('upload.main_text')}>
                {
                    isShowing
                    &&
                    <ImageCropperModal 
                        show={isShowing} 
                        handleImageCropModalClose={handleImageCropModalClose} 
                        image={picture} 
                        what={'post-image'}
                    />
                }
                    <Box sx={{width: '40rem', height: 'fit-content', boxShadow: 0, borderRadius: 5, mb: {xs: 4, sm: 1, md: 0}}}>
                        <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', py: 3, mb: 0}}>
                            {t('upload.title')}
                        </Typography>

                        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Box sx={{width: {xs: '100%', sm: '375px', md: '400px'}, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <PostItem
                                    base={{
                                        owner: {
                                            _id: currentUser?._id,
                                            nick: currentUser?.nick,
                                        },
                                        ownerAvatar: `${locations?.images}/${currentUser?.avatar}`,
                                        createdAt: t('upload.post.createdAt'),
                                        title: title ? title : t('upload.post.title'),
                                        description: description ? description : t('upload.post.description'),
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
                        </Box>
                        <CardContent>
                            <PostUploadForm/>
                        </CardContent>
                    </Box>
            </ImageRightFormContainer>
        </BaseContentContainer>
    );
}

export default PostUpload;

//<Stack spacing={{ xs: 1, sm: 2 }} sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}} direction="row" useFlexGap flexWrap="wrap">