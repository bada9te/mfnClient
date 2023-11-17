import { httpSaveFile } from "../../../requests/files";
import { httpUpdateUser } from "../../../requests/users";
import { useNavigate } from "react-router-dom";
import ImageCropperModal from "../../modals/image-cropper-modal/image-cropper-modal";
import { Box, Button, FormGroup, Typography } from "@mui/material";
import { toast } from "react-toastify";
import toastsConfig from "../../alerts/toasts-config";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { imageCropperModalState } from "../../modals/image-cropper-modal/reactive";
import { useState } from "react";
import blobToFile from "../../../common-functions/blobToFile";


const ProfileCardForm = (props) => {
    const navigate = useNavigate();
    const [picture, setPicture] = useState(null);
    const [avatarTitle, setAvatarTitle] = useState("Select image");
    const [backgroundTitle, setBackgroundTitle] = useState("Select image");

    const { user: currentUser, theme } = useReactiveVar(baseState);
    const { isShwoing: cropModalIsShowing, imageType } = useReactiveVar(imageCropperModalState);

    const cropImageFile = (img, what) => {
        imageCropperModalState({...imageCropperModalState(), isShowing: true, imageType: what})
        setPicture(URL.createObjectURL(img));
    };


    // handler
    const handleImageCropModalClose = async(value, picture) => {
        imageCropperModalState({...imageCropperModalState(), isShowing: value});

        if (picture != null) { 
            const id = toast.loading("Updating profile...");

            // save image on server
            let blob = await fetch(picture).then(r => r.blob());
            let result = await httpSaveFile(blobToFile(blob, currentUser?.nick + `${imageType}.jpg`));
            
            // process image assigning
            if (imageType === "avatar") {
                //setAvatar(result.data.file.filename);
                dispatchUser("avatar", result.data.file.filename);
                // assign avatar to current user on server
                result = await httpUpdateUser(currentUser?._id, result.data.file.filename, "avatar");
            } else {
                //setBackground(result.data.file.filename);
                dispatchUser("background", result.data.file.filename);
                // assign bg to current user on server
                result = await httpUpdateUser(currentUser?._id, result.data.file.filename, "background");
            }
            navigate('/profile-edit');

            if (result.data.done) {
                toast.update(id, {
                    render: "Profile updated", 
                    isLoading: false,
                    type: "success",
                    ...toastsConfig({ theme })
                });
            } else {
                toast.update(id, {
                    render: "Profile not updated", 
                    isLoading: false,
                    type: "error",
                    ...toastsConfig({ theme })
                });
            }
        }
    }

    const dispatchUser = (what, value) => {
        baseState({
            ...baseState(),
            user: {
                ...currentUser,
                [what]: value,
            },
        });
    }
    

    return (
        <>
            {
                cropModalIsShowing 
                ? 
                <ImageCropperModal 
                    show={cropModalIsShowing} 
                    handleImageCropModalClose={handleImageCropModalClose} 
                    image={picture} 
                />
                :
                null
            }
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
