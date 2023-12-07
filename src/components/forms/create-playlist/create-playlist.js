import { useForm } from "react-hook-form";
import { Box, TextField, Button, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useMutation, useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { PLAYLISTS_BY_OWNER_ID_QUERY, PLAYLIST_CREATE_MUTATION } from "../../../graphql-requests/playlists";
import { playlistsContainerState } from "../../containers/playlists-container/reactive";



const CreatePlaylistForm = props => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [ publicAccess, setPublicAccess ] = useState(true);
    const [ title, setTitle ] = useState("Playlist's title");
    const { enqueueSnackbar } = useSnackbar();
    const { user: currentUser } = useReactiveVar(baseState);
    const { maxCountPerPage, activePage } = useReactiveVar(playlistsContainerState);
    const [ createPlaylist ] = useMutation(PLAYLIST_CREATE_MUTATION);


    const onSubmit = async(data) => {
        enqueueSnackbar("Creating playlist...", { autoHideDuration: 1500 });
        let offset = activePage === 0 ? maxCountPerPage : (activePage - 1) * maxCountPerPage;
        await createPlaylist({
            variables: {
                input: {
                    owner: currentUser._id,
                    title,
                    public: publicAccess,
                },
            },
            refetchQueries: [
                {
                    query: PLAYLISTS_BY_OWNER_ID_QUERY, 
                    variables: { owner: currentUser._id, offset, limit: maxCountPerPage, } 
                }
            ]
        }).then(({ data }) => {
            reset();
            enqueueSnackbar("Playlist created", { autoHideDuration: 1500, variant: 'success' });
            playlistsContainerState({...playlistsContainerState(), page: "My playlists"});
        }).catch(err => {
            enqueueSnackbar("Can't create the playlist", { autoHideDuration: 3000, variant: 'error' });
        });
    }

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                error={Boolean(errors.Title)}
                helperText={errors.Title && "Title must be from 4 to 10 characters"}
                onInput={(e) => setTitle(e.target.value)}
                {...register("Title", {
                    maxLength: 10,
                    minLength: 4,
                    required: true,
                })}
            />
            
            <FormGroup sx={{my: 2}}>
                <FormControlLabel
                    control={
                        <Checkbox color="primary" {...register("AllowDownloads", {})}
                            checked={publicAccess} 
                            onChange={(e) => setPublicAccess(e.target.checked)}
                        />
                    }
                    label="Make playlist public"
                />
            </FormGroup>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2, boxShadow: 10 }}
            >
                Create playlist
            </Button>
        </Box>
    );
}

export default CreatePlaylistForm;

