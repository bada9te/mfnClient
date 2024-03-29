import { useForm } from "react-hook-form";
import { FormControlLabel, Button, TextField, Checkbox, FormGroup, Typography, FormControl, InputLabel, Select, MenuItem, Card } from "@mui/material";
import { useMutation, useReactiveVar } from "@apollo/client";
import { POSTS_BY_OWNER_QUERY, POSTS_QUERY, POST_CREATE_MUTATION } from "../../../utils/graphql-requests/posts";
import blobToFile from "../../../utils/common-functions/blobToFile";
import { baseState } from "../../baseReactive";
import { imageCropperModalState } from "../../modals/image-cropper-modal/reactive";
import { httpSaveFile } from "../../../utils/http-requests/files";
import { postUploadFormState } from "./reactive";
import ImageCropperModal from "../../modals/image-cropper-modal/image-cropper-modal";
import { useSnackbar } from "notistack";
import { postsContainerState } from "../../containers/posts-container/reactive";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import getFileExtension from "../../../utils/common-functions/getFileExtension";


const PostUploadForm = (props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { user: currentUser } = useReactiveVar(baseState);
    const { isShowing: cropModalIsShowing } = useReactiveVar(imageCropperModalState);
    const postUploadForm = useReactiveVar(postUploadFormState);
    const { maxCountPerPage } = useReactiveVar(postsContainerState);
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation("forms");
    const navigate = useNavigate();

    const genres = ["Country", "Pop", "Classical", "Funk", "Soul music", "Hip hop", "Rock", "Electronic music", "Latin", "Jazz", "Blues", "Folk", "Metal"]
    const [ selectedGenre, setSelectedGenre ] = useState(genres[0]);

    const supportedImageExtensions = ['.jpg', '.jpeg', '.png'];
    const supportedAudioExtensions = ['.wav', '.mp3'];

    const [ postUpload ] = useMutation(POST_CREATE_MUTATION, {
        variables: {
            input: {
                owner:            currentUser._id,
                title:            postUploadForm.title,
                description:      postUploadForm.description,
                audio:            postUploadForm.uploadedAudioName,
                image:            postUploadForm.uploadedPictureName,
                commentsAllowed:  postUploadForm.commentsAllowed,
                downloadsAllowed: postUploadForm.downloadsAllowed,
                category:         selectedGenre,
            },
        },
    });


    // form submit
    const onSubmit = async(data) => {
        let blob = await fetch(postUploadForm.picture).then(r => r.blob());

        enqueueSnackbar(t('upload.snack.pending'), { autoHideDuration: 1500 });
        
        await Promise.all([
            httpSaveFile(data.Audio[0])
                .then(({data}) => {
                    //console.log(data.file.filename)
                    postUploadFormState({ ...postUploadFormState(), uploadedAudioName: data.file.filename });
                }),
            httpSaveFile(blobToFile(blob, data.Image[0].name))
                .then(({data}) => {
                    //console.log(data.file.filename)
                    postUploadFormState({ ...postUploadFormState(), uploadedPictureName: data.file.filename });
                }),
        ]);

        await postUpload({
            update: (cache, { data }) => {
                const postData = JSON.parse(JSON.stringify(data.postCreate));
                postData.owner = {
                    _id: currentUser._id,
                    avatar: currentUser.avatar,
                    nick: currentUser.nick,
                };

                // function to update array of posts
                const updatePosts = (cachedArray, post) => {
                    let cachedPosts = JSON.parse(JSON.stringify(cachedArray));
                    if (cachedPosts.length >= maxCountPerPage) {
                        cachedPosts.pop();
                    }
                    cachedPosts.unshift(post);
                    return cachedPosts;
                };

                // update owner posts query
                let cachedData = cache.readQuery({ 
                    query: POSTS_BY_OWNER_QUERY, 
                    variables: { owner: currentUser._id, offset: 0, limit: maxCountPerPage }
                });
                if (cachedData) {
                    const posts = updatePosts(cachedData.postsByOwner.posts, postData);
                    cache.writeQuery({
                        query: POSTS_BY_OWNER_QUERY,
                        variables: { owner: currentUser._id, offset: 0, limit: maxCountPerPage },
                        data: { 
                            postsByOwner: { posts, count: posts.length + 1 }
                        }
                    });
                }

                cachedData = cache.readQuery({
                    query: POSTS_QUERY,
                    variables: { offset: 0, limit: maxCountPerPage }
                });
                if (cachedData) {
                    const posts = updatePosts(cachedData.posts.posts, postData);
                    cache.writeQuery({
                        query: POSTS_QUERY,
                        variables: { offset: 0, limit: maxCountPerPage },
                        data: { 
                            posts: { posts, count: posts.length + 1 }
                        }
                    });
                }
            }
        }).then(() => {
            reset();
            enqueueSnackbar(t('upload.snack.success'), { autoHideDuration: 1500, variant: 'success' });
            postUploadFormState({...postUploadFormState(), imageTitle: null, audioTitle: null, picture: null, audio: null});
            navigate(`/app/profile/${currentUser._id}`)
        }).catch(err => {
            enqueueSnackbar(t('upload.snack.error'), { autoHideDuration: 3000, variant: 'error' });
        });
    }

    
    
    // handlers
    const handlePicture = (file) => { 
        if (file !== null) {
            if (!supportedImageExtensions.includes(getFileExtension(file.name))) {
                enqueueSnackbar(t('upload.snack.error.image_not_supported'), { autoHideDuration: 3000, variant: 'error' });
                return;
            }
            postUploadFormState({ ...postUploadFormState(), imageTitle: file.name, picture: URL.createObjectURL(file) });
            imageCropperModalState({ ...imageCropperModalState(), imageType: "background", isShowing: true });
        }
    };

    const handleAudio = (file) => { 
        if (file !== null) {
            if (!supportedAudioExtensions.includes(getFileExtension(file.name))) {
                enqueueSnackbar(t('upload.snack.error.audio_not_supported'), { autoHideDuration: 3000, variant: 'error' });
                return;
            }
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
            &&
            <ImageCropperModal 
                show={cropModalIsShowing} 
                handleImageCropModalClose={handleImageCropModalClose} 
                image={postUploadForm.picture} 
            />
        }     
        <Card component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ borderRadius: 5, boxShadow: 10, p: 2 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label={t('upload.title')}
                name="title"
                error={Boolean(errors.Title)}
                helperText={errors.Title && t('upload.error.title')}
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
                label={t('upload.description')}
                name="description"
                error={Boolean(errors.ShortDesc)}
                helperText={errors.ShortDesc && t('upload.error.description')}
                onInput={(e) => updateState("description", e.target.value)}
                {...register("ShortDesc", {
                    maxLength: 40,
                    minLength: 4,
                    required: true,
                })}
            />
            <FormGroup sx={{my: 2}}>
                <Button variant="outlined" component="label">
                    {postUploadForm.imageTitle ? `${postUploadForm.imageTitle.slice(0, 30)}` : t('upload.image_text')}
                    <input type="file" hidden 
                        onInput={e => handlePicture(e.target.files[0] || null)}
                        {...register("Image", {
                            required: true,
                        })} 
                    />
                </Button>
                <Typography sx={{p: 1}} fontSize={14}>{supportedImageExtensions.join(', ')}</Typography>
                { errors.Image && <Typography sx={{ color: '#f44336', fontSize: 12, mx: 1, mt: 1 }}>{t('upload.error.image')}</Typography> }
            </FormGroup>
            <FormGroup sx={{my: 2}}>
                <Button variant="outlined" component="label">
                    {postUploadForm.audioTitle ? `${postUploadForm.audioTitle.slice(0, 30)}` : t('upload.audio_text')}
                    <input type="file" hidden 
                        onInput={e => handleAudio(e.target.files[0] || null)}
                        {...register("Audio", {
                            required: true,
                        })} 
                    />
                </Button>
                <Typography sx={{p: 1}} fontSize={14}>{supportedAudioExtensions.join(', ')}</Typography>
                { errors.Audio && <Typography sx={{ color: '#f44336', fontSize: 12, mx: 1, mt: 1 }}>{t('upload.error.audio')}</Typography> }
            </FormGroup>
            <FormGroup sx={{my: 2, mt: 4}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Music genre</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedGenre}
                        label="Music genre"
                        onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                        { genres.map((genre, key) => (<MenuItem key={key} value={genre}>{genre}</MenuItem>)) }
                    </Select>
                </FormControl>
            </FormGroup>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox color="primary" {...register("AllowComments", {})} 
                            checked={postUploadForm.commentsAllowed} 
                            onChange={(e) => updateState("commentsAllowed", e.target.checked)}
                        />
                    }
                    label={t('upload.allow_comments')}
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
                    label={t('upload.allow_downloads')}
                />
            </FormGroup>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2, boxShadow: 10 }}
            >
                {t('upload.submit')}
            </Button>
        </Card>
    </>
    );
}

export default PostUploadForm;
