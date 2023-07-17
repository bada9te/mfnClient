import { httpSaveFile } from "../../../requests/files";
import { httpUpdateUser } from "../../../requests/users";
import { useNavigate } from "react-router-dom";
import ImageCropperModal from "../../modals/image-cropper-modal/image-cropper-modal";
import * as Alert from "../../alerts/alerts";
import { Box, Button, FormGroup, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updatePartOfUser } from "../../baseSlice";
import { setImageType, setIsShowing } from "../../modals/image-cropper-modal/imageCropperModalSlice";
import { setPicture } from "./profileCardFormSlice";


const ProfileCardForm = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(state => state?.base?.user);
    const cropModalIsShowing = useSelector(state => state.imageCropperModal.isShowing);
    const picture = useSelector(state => state.profileCardForm.picture);
    const imageType = useSelector(state => state.imageCropperModal.imageType);
    const avatarTitle = useSelector(state => state.profileCardForm.avatarTitle);
    const backgroundTitle = useSelector(state => state.profileCardForm.backgroundTitle);


    const cropImageFile = (img, what) => {
        dispatch(setIsShowing(true));
        dispatch(setImageType(what));
        dispatch(setPicture(URL.createObjectURL(img)));
    };

    const blobToFile = (theBlob, fileName) => {
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
    }

    // handler
    const handleImageCropModalClose = async(value, picture) => {
        dispatch(setIsShowing(value));

        if (picture != null) { 
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
            alertUser("Profile", result.data.done);
        }
    }


    const dispatchUser = (what, value) => {
        dispatch(updatePartOfUser({what, value}))
    }
    
    const alertUser = (what, done) => {
        if (done) {
            Alert.alertSuccess(`${what} updated`);
        } else {
            Alert.alertError(`Error, ${what.toLowerCase()} not updated`);
        }
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
