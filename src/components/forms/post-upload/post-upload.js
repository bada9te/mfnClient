import { useForm } from "react-hook-form";
import { FormControlLabel, Button, Box, TextField, Checkbox, FormGroup } from "@mui/material";
import * as Alert from "../../alerts/alerts";
import { useDispatch, useSelector } from "react-redux";
import { savePostFile, setAudio, setAudioTitle, setCommentsAllowed, setDescription, setDownloadsAllowed, setImageTitle, setPicture, setTitle } from "./postUploadFormSlice";
import { setImageType, setIsShowing as setCropModalIsShowing } from "../../modals/image-cropper-modal/imageCropperModalSlice";
import { useMutation } from "@apollo/client";
import { POST_CREATE_MUTATION } from "../../../graphql/posts";
import blobToFile from "../../../common-functions/blobToFile";



const PostUploadForm = (props)=> {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.base.user._id);
    const theme = useSelector(state => state.base.theme);
    const postUploadForm = useSelector(state => state.postUploadForm);


    const [postUpload, { data, loading, error }] = useMutation(POST_CREATE_MUTATION);


    // form submit
    const onSubmit = async(data) => {
        let blob = await fetch(postUploadForm.picture).then(r => r.blob());

        Alert.alertPromise("Uploading...", "Post uploaded", "Can't upload the post", () => {
            return new Promise((resolve, reject) => {
                Promise.all([
                    dispatch(savePostFile({file: data.Audio[0], type: 'audio'})),
                    dispatch(savePostFile({file: blobToFile(blob, data.Image[0].name), type: 'image'}))
                ]).then(() => {
                    postUpload({
                        variables: {
                            input: {
                                owner: currentUserId,
                                title: postUploadForm.title,
                                description: postUploadForm.description,
                                audio: postUploadForm.uploadedAudioName,
                                image: postUploadForm.uploadedPictureName,
                                commentsAllowed: postUploadForm.commentsAllowed,
                                downloadsAllowed: postUploadForm.downloadsAllowed,
                            },
                        },
                    })
                    .then(result => {
                        console.log(result)
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
                    {postUploadForm.imageTitle}
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
                    {postUploadForm.audioTitle}
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
                            checked={postUploadForm.commentsAllowed} 
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
                            checked={postUploadForm.downloadsAllowed} 
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
