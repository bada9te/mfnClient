import { httpSaveFile } from "@/utils/http-requests/files";
import ImageCropperModal from "../../modals/image-cropper-modal/image-cropper-modal";
import { Box, Button, FormGroup, Typography } from "@mui/material";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { imageCropperModalState } from "../../modals/image-cropper-modal/reactive";
import { useState } from "react";
import blobToFile, { IBlob } from "@/utils/common-functions/blobToFile";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { useUserUpdateMutation } from "@/utils/graphql-requests/generated/schema";


export default function ProfileCardForm() {
    const [ picture, setPicture ] = useState<null | string>(null);

    const { user: currentUser } = useReactiveVar(baseState);
    const { isShowing: cropModalIsShowing, imageType } = useReactiveVar(imageCropperModalState);
    const { enqueueSnackbar } = useSnackbar();
    const [ updateUser ] = useUserUpdateMutation();
    const { t } = useTranslation("forms");
 
    const cropImageFile = (img: File, what: 'avatar' | 'background') => {
        imageCropperModalState({...imageCropperModalState(), isShowing: true, imageType: what})
        setPicture(URL.createObjectURL(img));
    };


    // handler
    const handleImageCropModalClose = async(value: boolean, picture: any) => {
        imageCropperModalState({...imageCropperModalState(), isShowing: value});

        if (picture != null) { 
            enqueueSnackbar(t('profile.snack.default.pending'), { autoHideDuration: 1500 });
            // save image on server
            let blob = await fetch(picture).then(r => r.blob()) as IBlob;
            let result = await httpSaveFile(blobToFile(blob, currentUser?.nick + `${imageType}.jpg`));
            
            // process image assigning
            await updateUser({
                variables: {
                    input: { _id: currentUser._id, what: imageType, value: result.data.file.filename },
                },
            }).then(({ data }) => {
                baseState({ ...baseState(), user: { ...baseState().user, ...data?.userUpdate} });
                enqueueSnackbar(t('profile.snack.default.success'), { autoHideDuration: 1500, variant: 'success' });
            }).catch(_ => {
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
                            onInput={e => cropImageFile((e.target as HTMLInputElement).files?.[0] as File, 'avatar')}
                        />
                    </Button>
                </FormGroup>
                <FormGroup sx={{py: 1}}>
                    <Typography>{t('profile.background')}</Typography>
                    <Button variant="contained" color="secondary" component="label">
                        {t('profile.select_background')}
                        <input type="file" hidden 
                            onInput={e => cropImageFile((e.target as HTMLInputElement).files?.[0] as File, 'background')}
                        />
                    </Button>
                </FormGroup>
            </Box>
        </>
    );
}
