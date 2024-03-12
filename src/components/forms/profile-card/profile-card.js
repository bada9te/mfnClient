import { httpSaveFile } from "../../../utils/http-requests/files";
import ImageCropperModal from "../../modals/image-cropper-modal/image-cropper-modal";
import { Box, Button, FormGroup, Typography } from "@mui/material";
import { useMutation, useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { imageCropperModalState } from "../../modals/image-cropper-modal/reactive";
import { useState } from "react";
import blobToFile from "../../../utils/common-functions/blobToFile";
import { useSnackbar } from "notistack";
import { USER_UPDATE_MUTATION } from "../../../utils/graphql-requests/users";
import { useTranslation } from "react-i18next";


const ProfileCardForm = (props) => {
    const [ picture, setPicture ] = useState(null);

    const { user: currentUser } = useReactiveVar(baseState);
    const { isShwoing: cropModalIsShowing, imageType } = useReactiveVar(imageCropperModalState);
    const { enqueueSnackbar } = useSnackbar();
    const [ updateUser ] = useMutation(USER_UPDATE_MUTATION);
    const { t } = useTranslation("forms");
 
    const cropImageFile = (img, what) => {
        imageCropperModalState({...imageCropperModalState(), isShowing: true, imageType: what})
        setPicture(URL.createObjectURL(img));
    };


    // handler
    const handleImageCropModalClose = async(value, picture) => {
        imageCropperModalState({...imageCropperModalState(), isShowing: value});

        if (picture != null) { 
            enqueueSnackbar(t('profile.snack.default.pending'), { autoHideDuration: 1500 });
            // save image on server
            let blob = await fetch(picture).then(r => r.blob());
            let result = await httpSaveFile(blobToFile(blob, currentUser?.nick + `${imageType}.jpg`));
            
            // process image assigning
            await updateUser({
                variables: {
                    input: { _id: currentUser._id, what: imageType, value: result.data.file.filename },
                },
            }).then(({ data }) => {
                baseState({ ...baseState(), user: { ...baseState().user, ...data.userUpdate} });
                enqueueSnackbar(t('profile.snack.default.success'), { autoHideDuration: 1500, variant: 'success' });
            }).catch(err => {
                enqueueSnackbar(t('profile.snack.default.error'), { autoHideDuration: 3000, variant: 'error' });
            });
        }
    }
    

    return (
        <>
            <ImageCropperModal 
                show={cropModalIsShowing} 
                handleImageCropModalClose={handleImageCropModalClose} 
                image={picture} 
            />
            <Box component="form">
                <FormGroup sx={{py: 1}}>
                    <Typography>{t('profile.avatar')}</Typography>
                    <Button variant="contained" color="secondary" component="label">
                        {t('profile.select_avatar')}
                        <input type="file" hidden 
                            onInput={e => cropImageFile(e.target.files[0], 'avatar')}
                        />
                    </Button>
                </FormGroup>
                <FormGroup sx={{py: 1}}>
                    <Typography>{t('profile.background')}</Typography>
                    <Button variant="contained" color="secondary" component="label">
                        {t('profile.select_background')}
                        <input type="file" hidden 
                            onInput={e => cropImageFile(e.target.files[0], 'background')}
                        />
                    </Button>
                </FormGroup>
            </Box>
        </>
    );
}

export default ProfileCardForm;
