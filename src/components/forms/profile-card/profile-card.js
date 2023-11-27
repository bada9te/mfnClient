import { httpSaveFile } from "../../../http-requests/files";
import ImageCropperModal from "../../modals/image-cropper-modal/image-cropper-modal";
import { Box, Button, FormGroup, Typography } from "@mui/material";
import { useMutation, useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { imageCropperModalState } from "../../modals/image-cropper-modal/reactive";
import { useState } from "react";
import blobToFile from "../../../common-functions/blobToFile";
import { useSnackbar } from "notistack";
import { USER_UPDATE_MUTATION } from "../../../graphql-requests/users";


const ProfileCardForm = (props) => {
    const [ picture, setPicture ] = useState(null);
    const [ avatarTitle, ] = useState("Select image");
    const [ backgroundTitle, ] = useState("Select image");

    const { user: currentUser } = useReactiveVar(baseState);
    const { isShwoing: cropModalIsShowing, imageType } = useReactiveVar(imageCropperModalState);
    const { enqueueSnackbar } = useSnackbar();
    const [ updateUser ] = useMutation(USER_UPDATE_MUTATION);
 
    const cropImageFile = (img, what) => {
        imageCropperModalState({...imageCropperModalState(), isShowing: true, imageType: what})
        setPicture(URL.createObjectURL(img));
    };


    // handler
    const handleImageCropModalClose = async(value, picture) => {
        imageCropperModalState({...imageCropperModalState(), isShowing: value});

        if (picture != null) { 
            enqueueSnackbar("Updating profile...", { autoHideDuration: 1500 });
            // save image on server
            let blob = await fetch(picture).then(r => r.blob());
            let result = await httpSaveFile(blobToFile(blob, currentUser?.nick + `${imageType}.jpg`));
            
            // process image assigning
            await updateUser({
                variables: {
                    input: {
                        _id: currentUser._id,
                        what: imageType,
                        value: result.data.file.filename,
                    },
                },
            }).then(({ data }) => {
                baseState({ ...baseState(), user: { ...baseState().user, ...data.userUpdate} });
                enqueueSnackbar("Profile updated", { autoHideDuration: 1500, variant: 'success' });
            }).catch(err => {
                enqueueSnackbar("Can't update the profile", { autoHideDuration: 3000, variant: 'error' });
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
                    <Typography>Avatar:</Typography>
                    <Button variant="outlined" component="label">
                        {avatarTitle}
                        <input type="file" hidden 
                            onInput={e => cropImageFile(e.target.files[0], 'avatar')}
                        />
                    </Button>
                </FormGroup>
                <FormGroup sx={{py: 1}}>
                    <Typography>Background:</Typography>
                    <Button variant="outlined" component="label">
                        {backgroundTitle}
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
