import { useForm } from "react-hook-form";
import { FormControlLabel, Button, Box, TextField, Checkbox, FormGroup } from "@mui/material";
import { useMutation, useReactiveVar } from "@apollo/client";
import { POSTS_BY_OWNER_QUERY, POST_CREATE_MUTATION } from "../../../graphql-requests/posts";
import blobToFile from "../../../common-functions/blobToFIle/blobToFile";
import { baseState } from "../../baseReactive";
import { imageCropperModalState } from "../../modals/image-cropper-modal/reactive";
import { httpSaveFile } from "../../../http-requests/files";
import { postUploadFormState } from "./reactive";
import ImageCropperModal from "../../modals/image-cropper-modal/image-cropper-modal";
import { useSnackbar } from "notistack";
import { postsContainerState } from "../../containers/posts-container/reactive";



const PostUploadForm = (props)=> {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { user: currentUser } = useReactiveVar(baseState);
    const { isShowing: cropModalIsShowing } = useReactiveVar(imageCropperModalState);
    const postUploadForm = useReactiveVar(postUploadFormState);
    const { maxCountPerPage } = useReactiveVar(postsContainerState);
    const { enqueueSnackbar } = useSnackbar();
 

    const [ postUpload ] = useMutation(POST_CREATE_MUTATION, {
        variables: {
            input: {
                owner:            currentUser._id,
                title:            postUploadForm.title,
                description:      postUploadForm.description,
                audio:            postUploadForm.uploadedAudioName,
                image:            postUploadForm.uploadedPictureName,
                commentsAllowed:  postUploadForm.commentsAllowed,
                downloadsAllowed: postUploadForm.downloadsAllowed
            },
        },
    });


    // form submit
    const onSubmit = async(data) => {
        let blob = await fetch(postUploadForm.picture).then(r => r.blob());

        enqueueSnackbar("Uploading...", { autoHideDuration: 1500 });
        
        await Promise.all([
            httpSaveFile(data.Audio[0])
                .then(({data}) => {
                    console.log(data.file.filename)
                    postUploadFormState({ ...postUploadFormState(), uploadedAudioName: data.file.filename });
                }),
            httpSaveFile(blobToFile(blob, data.Image[0].name))
                .then(({data}) => {
                    console.log(data.file.filename)
                    postUploadFormState({ ...postUploadFormState(), uploadedPictureName: data.file.filename });
                }),
        ]);

        await postUpload({
            update: (cache, { data }) => {
                const cachedData = cache.readQuery({ 
                    query: POSTS_BY_OWNER_QUERY, 
                    variables: { owner: currentUser._id, offset: 0, limit: maxCountPerPage }
                });
                cache.writeQuery({
                    query: POSTS_BY_OWNER_QUERY,
                    variables: { owner: currentUser._id, offset: 0, limit: maxCountPerPage },
                    data: { posts: cachedData?.posts ? [...cachedData.posts, data.postCreate] : [data.postCreate] }
                });
            }
        }).then(() => {
            reset();
            enqueueSnackbar("Post uploaded", { autoHideDuration: 1500, variant: 'success' });
        }).catch(err => {
            enqueueSnackbar("Can't upload new post", { variant: 'error' });
        });
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

    const handleImageCropModalClose = async(value, picture) => {
        imageCropperModalState({...imageCropperModalState(), isShowing: value});
        let blob = await fetch(picture).then(r => r.blob());
        postUploadFormState({ ...postUploadFormState(), picture: URL.createObjectURL(blobToFile(blob)) });
    }


    return(     
        <>
        {
            cropModalIsShowing 
            ? 
            <ImageCropperModal 
                show={cropModalIsShowing} 
                handleImageCropModalClose={handleImageCropModalClose} 
                image={postUploadForm.picture} 
            />
            :
            null
        }     
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
                    {`${postUploadForm.imageTitle.slice(0, 30)}`}
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
                    {`${postUploadForm.audioTitle.slice(0, 30)}`}
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
    </>
    );
}

export default PostUploadForm;
