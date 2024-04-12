import { SubmitHandler, useForm } from "react-hook-form";
import { TextField, Button, FormGroup, FormControlLabel, Checkbox, Card } from "@mui/material";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { PLAYLISTS_BY_OWNER_ID_QUERY} from "utils/graphql-requests/playlists";
import { playlistsContainerState } from "components/containers/playlists-container/reactive";
import { useTranslation } from "react-i18next";
import { PlaylistCreateMutation, PlaylistsByOwnerIdQuery, usePlaylistCreateMutation } from "utils/graphql-requests/generated/schema";


type Inputs = {
    Title: string;
    AllowDownloads: string;
}


export default function CreatePlaylistForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
    const [ publicAccess, setPublicAccess ] = useState(true);
    const [ title, setTitle ] = useState("Playlist's title");
    const { enqueueSnackbar } = useSnackbar();
    const { user: currentUser } = useReactiveVar(baseState);
    const { maxCountPerPage } = useReactiveVar(playlistsContainerState);
    const [ createPlaylist ] = usePlaylistCreateMutation();
    const { t } = useTranslation("forms");

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
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
                }) as PlaylistsByOwnerIdQuery;

                // function to update array of playlists
                const updatePlaylists = (cachedArray: PlaylistsByOwnerIdQuery["playlistsByOwnerId"]["playlists"], playlist: PlaylistCreateMutation["playlistCreate"]) => {
                    const cachedPlaylists = JSON.parse(JSON.stringify(cachedArray));
                    if (cachedPlaylists.length >= maxCountPerPage) {
                        cachedPlaylists.pop();
                    }
                    cachedPlaylists.unshift(playlist);
                    return cachedPlaylists;
                };

                if (cachedData) {
                    const playlists = updatePlaylists(cachedData.playlistsByOwnerId.playlists, data?.playlistCreate as PlaylistCreateMutation["playlistCreate"]);
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
                error={Boolean(errors.Title)}
                helperText={errors.Title && t('playlist.error.title')}
                onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
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
                color="secondary"
                sx={{ mt: 1, mb: 2, boxShadow: 10 }}
            >
                {t('playlist.submit')}
            </Button>
        </Card>
    );
}