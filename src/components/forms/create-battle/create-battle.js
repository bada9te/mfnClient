import { useForm } from "react-hook-form";
import PostItem from "../../common/post-item/post-item";
import * as Alert from "../../alerts/alerts";
import { Box, TextField, Button, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createBattle, setTitle } from "./createBattleFormSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { setIsMine } from "../../containers/post-select-container/postSelectContainerSlice";
import { setIsShowing as setPostSelectModalIsShowing} from "../../modals/post-select-modal/postSelectModalSlice";
import PostItemUnavailable from "../../common/post-item/post-item-unavailable";



const PostSelectHolder = props => {
    const {text, handler} = props;
    return (
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <PostItemUnavailable status="battle-form" text={text} selectHandler={handler}/>
        </Box>
    );
}


const CreateBattleForm = props => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const title = useSelector(state => state.createBattleForm.title);
    const post1 = useSelector(state => state.createBattleForm.post1);
    const post2 = useSelector(state => state.createBattleForm.post2);
    const theme = useSelector(state => state.base.theme);
    const dispatch = useDispatch();

    
    const handleOpenPostSelectModal = (isMine) => {
        dispatch(setIsMine(isMine));
        dispatch(setPostSelectModalIsShowing(true));
    }


    const onSubmit = async(data) => {
        Alert.alertPromise("Creating battle...", "Battle was successfully created", "Can't create the battle", () => {
            return new Promise((resolve, reject) => {
                dispatch(createBattle())
                    .then(unwrapResult)
                    .then(result => {
                        if (result.data.done) {
                            reset();
                            resolve();
                        } else {
                            reject();
                        }
                    });
            })
        }, { theme });
    }

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{p: 0, m: 0}}>
            <Box sx={{
                px: 2
            }}>
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
            </Box>
            
            <Stack spacing={3} flexWrap sx={{ my: 3 }}>
                <>
                    {
                        post1 != null 
                        ?
                        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <PostItem base={post1.base} addons={{...post1.addons, status: null}} />
                        </Box>
                        :
                        <PostSelectHolder text="Select my track" handler={() => handleOpenPostSelectModal(true)}/>
                    }
                </>
                <>
                    {
                        post2 != null 
                        ?
                        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <PostItem base={post2.base} addons={{...post2.addons, status: null}}/>
                        </Box>
                        :
                        <PostSelectHolder text="Select opponent track" handler={() => handleOpenPostSelectModal(false)}/>
                    }
                </>
            </Stack>
            
            <Box sx={{mx: 2}}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 2, boxShadow: 10 }}
                >
                    Create battle
                </Button>
            </Box>
        </Box>
    );
}

export default CreateBattleForm;

