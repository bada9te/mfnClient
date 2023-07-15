import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpSaveFile } from "../../../requests/files";
import { httpAddPost } from "../../../requests/posts";


const initialState = {
    title: "Track title",
    description: "Track description",
    audioTitle: "Upload audio",
    imageTitle: "Upload image",
    picture: null,
    audio: null,
    uploadedPictureName: "",
    uploadedAudioName: "",
    commentsAllowed: true,
    downloadsAllowed: true,
}

export const uploadPost = createAsyncThunk(
    'post-upload-form/uploadPost',
    async(_, thunkApi) => {
        const currentState = thunkApi.getState();
        const currentPost = currentState.postUploadForm;

        return await httpAddPost({
            ownerId: currentState.base.user._id,
            title: currentPost.title,
            description: currentPost.description,
            audio: currentPost.uploadedAudioName,
            image: currentPost.uploadedPictureName,
            commentsAllowed: currentPost.commentsAllowed,
            downloadsAllowed: currentPost.downloadsAllowed,
        });
    }
);

export const savePostFile = createAsyncThunk(
    'post-upload-form/saveFile',
    async({file, type}) => {
        return await httpSaveFile(file);
    }
);

const postUploadFormSlice = createSlice({
    name: 'post-upload',
    initialState: initialState,
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setDescription: (state, action) => {
            state.description = action.payload;
        },
        setAudioTitle: (state, action) => {
            state.audioTitle = action.payload;
        },
        setImageTitle: (state, action) => {
            state.imageTitle = action.payload;
        },
        setPicture: (state, action) => {
            state.picture = action.payload;
        },
        setAudio: (state, action) => {
            state.audio = action.payload;
        },
        setDownloadsAllowed: (state, action) => {
            state.downloadsAllowed = action.payload;
        },
        setCommentsAllowed: (state, action) => {
            state.commentsAllowed = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // files upload
            .addCase(savePostFile.fulfilled, (state, action) => {
                const type = action.meta.arg.type;
                const fileName = action.payload.data.file.filename;

                //console.log(type, fileName)
                if (type === 'image') {
                    state.uploadedPictureName = fileName;
                } else {
                    state.uploadedAudioName = fileName;
                }
            })
    }
});

const {reducer, actions} = postUploadFormSlice;

export default reducer;
export const {
    setTitle,
    setDescription,
    setAudioTitle,
    setImageTitle,
    setAudio,
    setPicture,
    setDownloadsAllowed,
    setCommentsAllowed,
} = actions;
