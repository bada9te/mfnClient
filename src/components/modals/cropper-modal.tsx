"use client"
import React, { useState, useCallback } from "react";
import Cropper, { Area } from 'react-easy-crop';
import getCroppedImg from '@/utils/cropper/cropper';
import { getDictionary } from "@/dictionaries/dictionaries";


export default function ImageCropperModal(props: {
    refDialog: React.MutableRefObject<HTMLDialogElement | null>
    image: any;
    handleImageCropModalClose: (b: string | null) => void;
    imageType: "post-image" | "background" | "avatar"
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const {image, handleImageCropModalClose, imageType, refDialog, dictionary} = props;

    const closeModal = () => {
        refDialog.current && refDialog.current.close();
    }

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, [])


    // handle image crop
    const handleImageCropping = async() => {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels, 0);
        handleImageCropModalClose(croppedImage);
        closeModal();
    }

    // cancle
    const handleCancelImageCropping = () => {
        handleImageCropModalClose(null);
        closeModal();
    }
    

    return (
        <dialog ref={refDialog} className="modal w-full h-full absolute">
            <div className="modal-box glass  text-gray-300 min-w-[100vw] min-h-[100vh] no-scrollbar text-start flex flex-col">
                <h4 className="font-bold text-lg z-50">{dictionary.modals.cropper.cropping}</h4>

                <div className="flex-1 min-h-full w-full flex justify-center items-start overflow-y-auto overflow-x-hidden mt-5 thin-scrollbar">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={['post-image', 'background'].includes(imageType) ? 21 / 9 : 1}
                        cropShape={['post-image', 'background'].includes(imageType) ? 'rect' : 'round'}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                </div>

                <div className="modal-action z-50"> 
                    <button className="btn bg-base-300 glass" onClick={handleCancelImageCropping}>{dictionary.modals.cropper.cancel}</button>
                    <button className="btn btn-primary glass " onClick={handleImageCropping}>{dictionary.modals.cropper.submit}</button>
                </div>
            </div>
        </dialog>
    );
}
