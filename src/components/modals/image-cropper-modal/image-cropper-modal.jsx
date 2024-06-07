import { useReactiveVar } from "@apollo/client/index.js";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Box } from "@mui/material";
import { useState, useCallback } from "react";
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage';
import { imageCropperModalState } from "./reactive";
import { useTranslation } from "react-i18next";


const ImageCropperModal = props => {
    const {image, handleImageCropModalClose} = props;

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const { imageType, isShowing } = useReactiveVar(imageCropperModalState);
    const { t } = useTranslation("modals");

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])


    // handle image crop
    const handleImageCropping = async() => {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels, 0);
        //console.log('donee', { croppedImage });
        handleImageCropModalClose(false, croppedImage);
    }
    

    return (
        <Dialog
            open={isShowing}
            fullWidth
            fullScreen
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
        >
            <DialogTitle id="dialog-title">{t('crop.title')}</DialogTitle>

            <DialogContent dividers={true} sx={{p: 0}}>
            <Box sx={{width: '100%', height: '100%', position: 'relative'}}>
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={['post-image', 'background'].includes(imageType) ? 21 / 9 : 1}
                    cropShape={['post-image', 'background'].includes(imageType) ? 'square' : 'round'}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => handleImageCropModalClose(false, null)}>{t('crop.cancel')}</Button>
                <Button onClick={handleImageCropping}>{t('crop.ok')}</Button>
            </DialogActions>
        </Dialog>
    );
}


export default ImageCropperModal;