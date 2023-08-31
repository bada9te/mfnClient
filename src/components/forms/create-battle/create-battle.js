import { useForm } from "react-hook-form";
import BattleItem from "../../common/battle-item/battle-item";
import PostItem from "../../common/post-item/post-item";
import PostSelectModal from "../../modals/post-select-modal/post-select-modal";
import * as Alert from "../../alerts/alerts";
import { Box, TextField, Button, Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createBattle, setTitle } from "./createBattleFormSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { setIsMine } from "../../containers/post-select-container/postSelectContainerSlice";
import { setIsShowing as setPostSelectModalIsShowing} from "../../modals/post-select-modal/postSelectModalSlice";



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
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{
                
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
            
            <Box sx={{my: 3}}>
                <BattleItem
                    title={title}
                    post1={
                        <>
                            {
                                post1 != null 
                                ?
                                <PostItem base={post1.base} addons={{...post1.addons, status: null}} />
                                :
                                <>
                                    <Card sx={{ width: '25em',  minHeight: '240px', maxHeight: '285px', my: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Button
                                            variant="contained"
                                            sx={{ mt: 1, mb: 2 }}
                                            onClick={() => handleOpenPostSelectModal(true)}
                                        >
                                            Select my track
                                        </Button>
                                    </Card>
                                    <PostSelectModal/>
                                </>
                            }
                        </>
                    }
                    post2={
                        <>
                            {
                                post2 != null 
                                ?
                                <PostItem base={post2.base} addons={{...post2.addons, status: null}}/>
                                :
                                <>
                                    <Card sx={{ width: '25em',  minHeight: '240px', maxHeight: '285px', my: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Button
                                            variant="contained"
                                            sx={{ mt: 1, mb: 2 }}
                                            onClick={() => handleOpenPostSelectModal(false)}
                                        >
                                            Select opponent track
                                        </Button>
                                    </Card>
                                    <PostSelectModal/>
                                </>
                            }
                        </>
                    }
                    createdAt="XX:XX:XX"
                    willFinishAt="XX:XX:XX"
                />
            </Box>
            
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
            >
                Create battle
            </Button>
        </Box>
    );
}

export default CreateBattleForm;

