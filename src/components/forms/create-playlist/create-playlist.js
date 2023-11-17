import { useForm } from "react-hook-form";
import * as Alert from "../../alerts/alerts";
import { Box, TextField, Button, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { useState } from "react";



const CreatePlaylistForm = props => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { theme } = useReactiveVar(baseState);
    const [publicAccess, setPublicAccess] = useState(true);
    const [title, setTitle] = useState("Playlist's title")


    const onSubmit = async(data) => {
        Alert.alertPromise("Creating playlist...", "Playlist was successfully created", "Can't create the playlist", () => {
            return new Promise((resolve, reject) => {
                /*dispatch(createPlaylist())
                    .then(unwrapResult)
                    .then(result => {
                        if (result.data.done) {
                            reset();
                            resolve();
                        } else {
                            reject();
                        }
                    });
                */
            })
        }, { theme });
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

