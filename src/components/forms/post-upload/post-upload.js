import { useForm } from "react-hook-form";
import { Stack, Card, Typography, CardContent, FormControlLabel, Button, Box, TextField, Checkbox, FormGroup } from "@mui/material";
import * as Alert from "../../alerts/alerts";
import { useDispatch, useSelector } from "react-redux";
import { savePostFile, setAudio, setAudioTitle, setCommentsAllowed, setDescription, setDownloadsAllowed, setImageTitle, setPicture, setTitle, uploadPost } from "./postUploadFormSlice";
import { setImageType, setIsShowing as setCropModalIsShowing } from "../../modals/image-cropper-modal/imageCropperModalSlice";
import { useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";



const PostUploadForm = (props)=> {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const audioTitle = useSelector(state => state.postUploadForm.audioTitle);
    const imageTitle = useSelector(state => state.postUploadForm.imageTitle);
    const picture = useSelector(state => state.postUploadForm.picture);
    const commentsAllowed = useSelector(state => state.postUploadForm.commentsAllowed);
    const downloadsAllowed = useSelector(state => state.postUploadForm.downloadsAllowed);
    const theme = useSelector(state => state.base.theme);
    const dispatch = useDispatch();


    const blobToFile = (theBlob, fileName) => {
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
    }

    // form submit
    const onSubmit = async(data) => {
        let blob = await fetch(picture).then(r => r.blob());
        Alert.alertPromise("Uploading...", "Post uploaded", "Can't upload the post", () => {
            return new Promise((resolve, reject) => {
                Promise.all([
                    dispatch(savePostFile({file: data.Audio[0], type: 'audio'})),
                    dispatch(savePostFile({file: blobToFile(blob, data.Image[0].name), type: 'image'}))
                ]).then(() => {
                    dispatch(uploadPost())
                        .then(unwrapResult)
                        .then(result => {
                            if (result.data.done) {
                                reset();
                                resolve();
                            } else {
                                reject();
                            }
                        });
                });
            }); 
        }, { theme });  
    }

    
    
    // handlers
    const handlePicture = (file) => { 
        if (file !== null) {
            dispatch(setImageTitle(file.name));
            dispatch(setPicture(URL.createObjectURL(file)));
            dispatch(setImageType("background"));
            dispatch(setCropModalIsShowing(true));
        }
    };

    const handleAudio = (file) => { 
        if (file !== null) {
            dispatch(setAudioTitle(file.name));
            dispatch(setAudioTitle(file.name));
            dispatch(setAudio(URL.createObjectURL(file)));
        }
    };

    useEffect(() => {
        //console.log('TODO: clear me');
    }, [])


    return(          
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{margin: 1}}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                error={Boolean(errors.Title)}
                helperText={errors.Title && "Title must be from 4 to 10 characters"}
                onInput={(e) => dispatch(setTitle(e.target.value))}
                {...register("Title", {
                    maxLength: 10,
                    minLength: 4,
                    required: true,
                })}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Short description"
                name="description"
                error={Boolean(errors.ShortDesc)}
                helperText={errors.ShortDesc && "Short description must be from 4 to 20 characters"}
                onInput={(e) => dispatch(setDescription(e.target.value))}
                {...register("ShortDesc", {
                    maxLength: 40,
                    minLength: 4,
                    required: true,
                })}
            />
            <FormGroup sx={{my: 2}}>
                <Button variant="outlined" component="label">
                    {imageTitle}
                    <input type="file" hidden 
                        onInput={e => handlePicture(e.target.files[0] || null)}
                        {...register("Image", {
                            required: true,
                        })} 
                    />
                </Button>
            </FormGroup>
            <FormGroup sx={{my: 2}}>
                <Button variant="outlined" component="label">
                    {audioTitle}
                    <input type="file" hidden 
                        onInput={e => handleAudio(e.target.files[0] || null)}
                        {...register("Audio", {
                            required: true,
                        })} 
                    />
                </Button>
            </FormGroup>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox color="primary" {...register("AllowComments", {})} 
                            checked={commentsAllowed} 
                            onChange={(e) => dispatch(setCommentsAllowed(e.target.checked))}
                        />
                    }
                    label="Allow comments"
                />
            </FormGroup>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox color="primary" {...register("AllowDownloads", {})}
                            checked={downloadsAllowed} 
                            onChange={(e) => dispatch(setDownloadsAllowed(e.target.checked))}
                        />
                    }
                    label="Allow downloads"
                />
            </FormGroup>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, boxShadow: 10 }}
            >
                Upload
            </Button>
        </Box>
    );
}

export default PostUploadForm;
