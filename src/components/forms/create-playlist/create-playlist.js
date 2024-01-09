import { useForm } from "react-hook-form";
import { TextField, Button, FormGroup, FormControlLabel, Checkbox, Card } from "@mui/material";
import { useMutation, useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { PLAYLISTS_BY_OWNER_ID_QUERY, PLAYLIST_CREATE_MUTATION } from "../../../graphql-requests/playlists";
import { playlistsContainerState } from "../../containers/playlists-container/reactive";
import { useTranslation } from "react-i18next";



const CreatePlaylistForm = props => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [ publicAccess, setPublicAccess ] = useState(true);
    const [ title, setTitle ] = useState("Playlist's title");
    const { enqueueSnackbar } = useSnackbar();
    const { user: currentUser } = useReactiveVar(baseState);
    const { maxCountPerPage } = useReactiveVar(playlistsContainerState);
    const [ createPlaylist ] = useMutation(PLAYLIST_CREATE_MUTATION);
    const { t } = useTranslation("forms");

    const onSubmit = async(data) => {
        enqueueSnackbar(t('playlist.snack.pending'), { autoHideDuration: 1500 });
        await createPlaylist({
            variables: {
                input: {
                    owner: currentUser._id,
                    title,
                    public: publicAccess,
                },
            },
            update: (cache, { data }) => {
                const cachedData = cache.readQuery({
                    query: PLAYLISTS_BY_OWNER_ID_QUERY, 
                    variables: { owner: currentUser._id, offset: 0, limit: maxCountPerPage } 
                });

                // function to update array of playlists
                const updatePlaylists = (cachedArray, playlist) => {
                    const cachedPlaylists = JSON.parse(JSON.stringify(cachedArray));
                    if (cachedPlaylists.length >= maxCountPerPage) {
                        cachedPlaylists.pop();
                    }
                    cachedPlaylists.unshift(playlist);
                    return cachedPlaylists;
                };

                if (cachedData) {
                    const playlists = updatePlaylists(cachedData.playlistsByOwnerId.playlists);
                    cache.writeQuery({
                        query: PLAYLISTS_BY_OWNER_ID_QUERY,
                        variables: { owner: currentUser._id, offset: 0, limit: maxCountPerPage },
                        data: {
                            playlistsByOwnerId: { playlists, count: playlists.length + 1 }
                        }
                    });
                }
            }
        }).then(({ data }) => {
            reset();
            enqueueSnackbar(t('playlist.snack.success'), { autoHideDuration: 1500, variant: 'success' });
            playlistsContainerState({...playlistsContainerState(), page: "My playlists"});
        }).catch(err => {
            enqueueSnackbar(t('playlist.snack.error'), { autoHideDuration: 3000, variant: 'error' });
        });
    }

    return (
        <Card component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ py: 1, px: 2, borderRadius: 5, boxShadow: 10 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label={t('playlist.title')}
                name="title"
                error={Boolean(errors.Title)}
                helperText={errors.Title && t('playlist.error.title')}
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
                    label={t('playlist.make_public')}
                />
            </FormGroup>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2, boxShadow: 10 }}
            >
                {t('playlist.submit')}
            </Button>
        </Card>
    );
}

export default CreatePlaylistForm;

