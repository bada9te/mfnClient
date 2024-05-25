import PostUploadForm from "../components/forms/post-upload/post-upload";
import PostItem from "../components/common/post-item/post-item";
import ImageCropperModal from "../components/modals/image-cropper-modal/image-cropper-modal";
import { Typography, CardContent, Box } from "@mui/material";
import ImageRightFormContainer from "../components/containers/image-right-form-container/image-right-form.container";
import newPostFormBG from '../assets/bgs/newPostFormBG.png';
import BaseContentContainer from "../components/containers/base-content-container/base-content-container";
import { imageCropperModalState } from "../components/modals/image-cropper-modal/reactive";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../components/baseReactive";
import { postUploadFormState } from "../components/forms/post-upload/reactive";
import { useTranslation } from "react-i18next";


export default function PostUpload() {
    const { user: currentUser, locations } = useReactiveVar(baseState);
    const { audio, title, description,  picture, commentsAllowed, downloadsAllowed } = useReactiveVar(postUploadFormState);
    const { isShowing } = useReactiveVar(imageCropperModalState);
    const { t } = useTranslation("pages");

    const handleImageCropModalClose = (isShowing: boolean, picture: any) => {
        imageCropperModalState({ ...imageCropperModalState(), isShowing })
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
                    <Box sx={{ width: '40rem', boxShadow: 0, borderRadius: 5 }}>
                        <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', py: 3, mb: 0}}>
                            {t('upload.title')}
                        </Typography>

                        <Box sx={{width: '100%', height: 'fit-content', display: 'flex', justifyContent: 'center'}}>
                            <Box sx={{width: {xs: '100%', sm: '375px', md: '400px'}, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <PostItem
                                    base={{
                                        _id: null,
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
                                />
                            </Box>
                        </Box>
                        <CardContent sx={{ px: 0, py: 2, ":last-child": { pb: 0 } }}>
                            <PostUploadForm/>
                        </CardContent>
                    </Box>
            </ImageRightFormContainer>
        </BaseContentContainer>
    );
}
