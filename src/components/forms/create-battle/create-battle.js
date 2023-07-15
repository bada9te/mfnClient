import { useForm } from "react-hook-form";
import BattleItem from "../../common/battle-item/battle-item";
import PostItem from "../../common/post-item/post-item";
import PostSelectModal from "../../modals/post-select-modal/post-select-modal";
import * as Alert from "../../alerts/alerts";
import getTimeSince from "../../../common-functions/getTimeSince";
import { Box, TextField, Button, Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createBattle, setTitle } from "./createBattleFormSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { setIsMine } from "../../containers/post-select-container/postSelectContainerSlice";
import { setIsShowing as setPostSelectModalIsShowing} from "../../modals/post-select-modal/postSelectModalSlice";



const CreateBattleForm = props => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const locations = useSelector(state => state?.base?.locations);
    const title = useSelector(state => state.createBattleForm.title);
    const post1 = useSelector(state => state.createBattleForm.post1);
    const post2 = useSelector(state => state.createBattleForm.post2);
    const dispatch = useDispatch();

    const handleOpenPostSelectModal = (isMine) => {
        dispatch(setIsMine(isMine));
        dispatch(setPostSelectModalIsShowing(true));
    }


    const onSubmit = async(data) => {
        dispatch(createBattle())
            .then(unwrapResult)
            .then(result => {
                if (result.data.done) {
                    reset();
                    Alert.alertSuccess("Battle was successfully created");
                } else {
                    Alert.alertError("Can't create the battle");
                }
            });
    }

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{px: 3}}>
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
                        post1 != null 
                        ?
                        <PostItem 
                            id={post1._id} 
                            user={[post1.owner._id, post1.owner.nick, `${locations?.images}/${post1.owner.avatar}`,]}
                            createdAt={getTimeSince(new Date(post1.createdAt)) + ' ago'} 
                            title={post1.title}  
                            description={post1.description} 
                            img={`${locations?.images}/${post1.image}`}
                            audio={`${locations?.audios}/${post1.audio}`} 
                            likedBy={post1.likedBy} status={null}
                            savedBy={post1.savedBy}
                            comments={post1.comments}
                            commentsAllowed={post1.commentsAllowed}
                            downloadsAllowed={post1.downloadsAllowed}
                            profileLinkAccessable={true} 
                        />
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
                    post2={
                        post2 != null 
                        ?
                        <PostItem 
                            id={post2._id} 
                            user={[post2.owner._id, post2.owner.nick, `${locations?.images}/${post2.owner.avatar}`,]}
                            createdAt={getTimeSince(new Date(post2.createdAt)) + ' ago'} 
                            title={post2.title} description={post2.description} 
                            img={`${locations?.images}/${post2.image}`}
                            audio={`${locations?.audios}/${post2.audio}`} 
                            likedBy={post2.likedBy} status={null} 
                            savedBy={post2.savedBy}
                            comments={post2.comments}
                            profileLinkAccessable={true} 
                            commentsAllowed={post2.commentsAllowed}
                            downloadsAllowed={post2.downloadsAllowed}
                        />
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
                Create
            </Button>
        </Box>
    );
}

export default CreateBattleForm;

