import { useForm } from "react-hook-form";
import { FormControlLabel, Button, Box, TextField, Checkbox, FormGroup } from "@mui/material";
import * as Alert from "../../alerts/alerts";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useReactiveVar } from "@apollo/client";
import { POST_CREATE_MUTATION } from "../../../graphql/posts";
import blobToFile from "../../../common-functions/blobToFile";
import { baseState } from "../../baseReactive";
import { imageCropperModalState } from "../../modals/image-cropper-modal/reactive";
import { httpSaveFile } from "../../../requests/files";
import { postUploadFormState } from "./reactive";



const PostUploadForm = (props)=> {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    
    const dispatch = useDispatch();
    const { user: currentUser, theme } = useReactiveVar(baseState);
    const postUploadForm = useReactiveVar(postUploadFormState);


    const [postUpload, { data, loading, error }] = useMutation(POST_CREATE_MUTATION);


    // form submit
    const onSubmit = async(data) => {
        let blob = await fetch(postUploadForm.picture).then(r => r.blob());

        Alert.alertPromise("Uploading...", "Post uploaded", "Can't upload the post", () => {
            return new Promise(async(resolve, reject) => {
                Promise.all([
                    await httpSaveFile(data.Audio[0])
                        .then((data) => {
                            postUploadFormState({ ...postUploadFormState(), uploadedAudioName: data.file.filename });
                        }),
                    await httpSaveFile(blobToFile(blob, data.Image[0].name))
                        .then((data) => {
                            postUploadFormState({ ...postUploadFormState(), uploadedPictureName: data.file.filename });
                        }),
                ]).then(() => {
                    postUpload({
                        variables: {
                            input: {
                                owner: currentUser._id,
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
            postUploadFormState({ ...postUploadFormState(), imageTitle: file.name, picture: URL.createObjectURL(file) });
            imageCropperModalState({ ...imageCropperModalState(), imageType: "background", isShowing: true });
        }
    };

    const handleAudio = (file) => { 
        if (file !== null) {
            postUploadFormState({ ...postUploadFormState(), audioTitle: file.name, audio: URL.createObjectURL(file) });
        }
    };

    const updateState = (what, value) => {
        postUploadFormState({ ...postUploadFormState(), [what]: value })
    }


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
                onInput={(e) => updateState("title", e.target.value)}
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
                onInput={(e) => updateState("description", e.target.value)}
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
                            onChange={(e) => updateState("commentsAllowed", e.target.checked)}
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
                            onChange={(e) => updateState("downloadsAllowed", e.target.checked)}
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
