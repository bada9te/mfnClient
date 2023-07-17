import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import * as Alert from '../../alerts/alerts';
import userSocket from '../../../socket/user/socket-user';

import { Tooltip, Button, Avatar, Card, CardHeader, IconButton, CardMedia, CardContent, CardActions, Box, Typography, Skeleton } from "@mui/material";
import { Favorite, FavoriteBorder, CommentOutlined, Bookmark, BookmarkBorder, PlayArrow, Pause, Loop, VolumeOff, VolumeUp } from "@mui/icons-material";
import PostItemDropDown from './post-item-dropdown/post-item-dropdown';
import { useDispatch, useSelector } from "react-redux";
import { switchPostInSaved, switchPostLike, updateCommentsSocket, updateLikesSocket } from "../../containers/posts-container/postsContainerSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchComments } from "../../containers/comments-container/commentsContainerSlice";
import { setIsShowing as setCommentsModalIsShowing } from "../../modals/comments-modal/commentsModalSlice";
import { setIsMuted, setIsPlaying, setLoop, setSrc } from "../audio-player/audioPlayerSlice";
import { setIsShowing as setUserSelectModalIsShowing } from '../../modals/user-select-modal/userSelectModalSlice';
import { setSelectType, setSharedItem } from '../../containers/user-select-container/userSelectContainerSlice';



const PostItem = (props) => {
    const {
        id, 
        user, 
        img, 
        audio, 
        createdAt, 
        title, 
        description, 
        likedBy, 
        savedBy, 
        comments, 
        status, 
        profileLinkAccessable, 
        handlePostSelection,
        downloadsAllowed,
        commentsAllowed,
        battleId,
        makeBattleVote,
        postNScore,
        votedBy,
    } = props;
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false)
    const [likesAmount, setLikesAmount] = useState(likedBy.length);
    const [savesAmount, setSavesAmount] = useState(savedBy.length);

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state?.base?.user);
    const currentAudio = useSelector(state => state.audioPlayer.src);
    const isPlaying = useSelector(state => state.audioPlayer.isPlaying);
    const isMuted = useSelector(state => state.audioPlayer.isMuted);
    const volume = useSelector(state => state.audioPlayer.volume);
    const loop = useSelector(state => state.audioPlayer.loop);
    const controlsLocked = useSelector(state => state.audioPlayer.controlsLocked);
    
    // nav
    const navigate = useNavigate();
    

    // handle likes
    const onLikesChanged = async(e, value) => {
        if (status !== "upload") {
            if (status !== "upload") {
                if (isLiked) {
                    setIsLiked(false);
                    setLikesAmount(likesAmount - 1);
                    userSocket.emit("post-remove-like", {
                        eventUserId: currentUser._id,
                        postId: id,
                        postOwnerId: user[0],
                    });
                } else {
                    setIsLiked(true);
                    setLikesAmount(likesAmount + 1);
                    userSocket.emit("post-add-like", {
                        receiver: user[0],
                        sender: currentUser._id,
                        post: id,
                        text: `${currentUser.nick} liked your track`,
                    });
                }
            }
            dispatch(switchPostLike({userId: currentUser._id, postId: id}));
        } 
    }

    // switch loop
    const switchLoop = () => {
        dispatch(setLoop(!loop));
    }

    // play aduio
    const playAudio = () => {
        dispatch(setSrc(audio));
        dispatch(setIsPlaying(true));
    }

    // pause audio
    const pauseAudio = () => {
        dispatch(setIsPlaying(false));
    }

    // mute unmute
    const handleMuteUnmute = () => {
        dispatch(setIsMuted(!isMuted));
    }
    
    // handle audio download
    const handleAudioDownload = () => {
        if (status !== "upload") {
            saveAs(audio, `${user[1]} - ${title}`);
        }
    }
    // open owner profile
    const goToProfile = () => {
        if (profileLinkAccessable) {
            navigate(`/app/profile/${user[0]}`)
        }
    }

    // open user select modal to share
    const shareTrack = () => {
        if (status !== "upload") {
            dispatch(setSharedItem(id));
            dispatch(setSelectType('postShare'));
            dispatch(setUserSelectModalIsShowing(true));
        }
    }

    // comments modal
    const switchShowCommentsModal = () => {
        if (status !== "upload") {
            dispatch(setCommentsModalIsShowing(true));
            dispatch(fetchComments({
                postId: id, 
                commentsIds: comments,
            }));
        }
    }

    // add to saved or remove from saved
    const switchInSaved = async() => {
        if (status !== "upload") {
            if (isSaved) {
                setSavesAmount(savesAmount - 1);
                userSocket.emit("post-remove-save", {
                    eventUserId: currentUser._id,
                    postId: id,
                    postOwnerId: user[0],
                });
            } else {
                setSavesAmount(savesAmount + 1);
                if (!isSaved && currentUser._id !== user[0]) {
                    userSocket.emit("post-add-save", {
                        receiver: user[0],
                        sender: currentUser._id,
                        post: id,
                        text: `${currentUser.nick} bookmarked your track`,
                    });
                }
            }
            dispatch(switchPostInSaved({userId: currentUser._id, postId: id}))
                .then(unwrapResult)
                .then(result => {
                    if (result.data.done) {
                        Alert.alertSuccess(`Success`);
                    }
                });
        }
    }
        
    // init
    useEffect(() => {
        if (currentUser._id && currentUser._id !== "") {
            likedBy.find(likedById => likedById === currentUser?._id) ? setIsLiked(true) : setIsLiked(false);
            savedBy.find(savedById => savedById === currentUser?._id) ? setIsSaved(true) : setIsSaved(false);
        }
    }, [likedBy, currentUser?.savedPosts, currentUser?._id, id, savedBy]);

    // socket
    useEffect(() => {
        userSocket.on(`post-${id}-was-liked`, (data) => {
            setLikesAmount(likesAmount + 1);
            dispatch(updateLikesSocket({ postId: data.post, userId: data.sender }));
            //console.log(data);
        });
        userSocket.on(`post-${id}-was-unliked`, (data) => {
            setLikesAmount(likesAmount - 1);
            dispatch(updateLikesSocket({ postId: data.post, userId: data.sender }));
            //console.log(data);
        });
        userSocket.on(`post-${id}-was-saved`, (data) => {
            setSavesAmount(savesAmount + 1);
            if (data.sender === currentUser._id) {
                setIsSaved(true);
            }
            //console.log(data);
        });
        userSocket.on(`post-${id}-was-unsaved`, (data) => {
            setSavesAmount(savesAmount - 1);
            if (data.sender === currentUser._id) {
                setIsSaved(false);
            }
            //console.log(data);
        });
        userSocket.on(`post-${id}-was-commented`, (data) => {
            dispatch(updateCommentsSocket(data));
            //console.log(data);
        });
        userSocket.on(`post-${id}-was-uncommented`, (data) => {
            dispatch(updateCommentsSocket(data));
            //console.log(data);
        })

        return () => {
            userSocket.off(`post-${id}-was-liked`);
            userSocket.off(`post-${id}-was-unliked`);
            userSocket.off(`post-${id}-was-saved`);
            userSocket.off(`post-${id}-was-unsaved`);
            userSocket.off(`post-${id}-was-commented`);
            userSocket.off(`post-${id}-was-uncommented`);
        };
    }, [id, likesAmount, savesAmount, dispatch, currentUser?._id]);

    // for post upload form visualization
    useEffect(() => {}, [commentsAllowed, downloadsAllowed])
    return (
        <>
            <Card sx={{width: '400px', boxShadow: 3}}>
                <CardHeader
                    avatar={
                        
                        <Avatar 
                            onClick={goToProfile}
                            src={user[2].endsWith('/') ? "NULL" : user[2]} 
                            sx={{bgcolor: "gray", boxShadow: 3, cursor: 'pointer'}} 
                            aria-label="recipe"
                            alt={user[1]}
                        />
                    }
                    title={user[1]}
                    subheader={createdAt}
                    action={
                        <PostItemDropDown 
                            downloadsAllowed={downloadsAllowed} 
                            handleAudioDownload={handleAudioDownload} 
                            handleShareTrack={shareTrack}
                        />
                    }
                />
                
                
                <Box sx={{ position: 'relative' }}>
                    {
                        (() => {
                            if (img?.endsWith('/') || !img) {
                                return (
                                    <Skeleton variant="rectangular" width={400} height={160} />
                                );
                            } else {
                                return (
                                    <CardMedia
                                        component="img"
                                        height="160"
                                        width="400"
                                        image={img}
                                        alt="Paella dish"
                                    />
                                );
                            }
                        })()
                    }
                    <Box sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            bgcolor: 'rgba(0,0,0,0.3)',
                            color: 'white',
                            padding: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backdropFilter: 'blur(5px)'
                        }}
                    >
                        <Box>
                            <Typography variant='h5'>{title}</Typography>
                            <Typography variant='p'>{description}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Tooltip title="Save">
                                    <span>
                                        <IconButton 
                                            aria-label="bookmark" 
                                            onClick={switchInSaved} 
                                            sx={{ color: 'white' }}
                                            disabled={currentUser && currentUser._id !== "" ? false : true}
                                        >
                                            { isSaved ? <Bookmark/> : <BookmarkBorder/> }
                                        </IconButton>
                                    </span>
                                </Tooltip>
                                <Typography sx={{ fontSize: 12 }}>{savesAmount}</Typography>
                            </Box>
                            {
                                commentsAllowed
                                ?
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Tooltip title="Comment out">
                                        <span>
                                            <IconButton 
                                                aria-label="comment" 
                                                sx={{ color: 'white' }} 
                                                onClick={switchShowCommentsModal}
                                                disabled={currentUser && currentUser._id !== "" ? false : true}
                                            >
                                                <CommentOutlined />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                    <Typography sx={{ fontSize: 12 }}>{comments.length}</Typography>
                                </Box>
                                :
                                null
                            }
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Tooltip title="Like">
                                    <span>
                                        <IconButton 
                                            aria-label="add to favorites" 
                                            onClick={(e) => onLikesChanged(e, -isLiked)} 
                                            sx={{ color: 'white' }}
                                            disabled={currentUser && currentUser._id !== "" ? false : true}
                                        >
                                            { isLiked ? <Favorite/> : <FavoriteBorder/> }
                                        </IconButton>
                                    </span>
                                </Tooltip>
                                <Typography sx={{ fontSize: 12 }}>{likesAmount}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                    
                <CardContent sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    m: 0, 
                    p: 0, 
                    paddingBottom: 0, 
                    "&:last-child": { paddingBottom: 0 }
                }}>
                    <>
                    {
                        (() => {
                            if (currentAudio === audio && isPlaying) {
                                return (
                                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>   
                                        <Box>
                                            <IconButton onClick={pauseAudio} disabled={controlsLocked ? true : false}>
                                                <Pause/>
                                            </IconButton>
                                            <IconButton onClick={switchLoop} disabled={controlsLocked ? true : false}>
                                                <Loop sx={{ color: loop ? '#1BA39C' : '' }}/>
                                            </IconButton>
                                        </Box>
                                        
                                        <IconButton onClick={handleMuteUnmute} disabled={controlsLocked ? true : false}>
                                            {  isMuted || volume === 0 ? <VolumeOff/> : <VolumeUp/> }
                                        </IconButton>
                                    </Box>
                                );
                            } else {
                                return (
                                    <>
                                        <IconButton onClick={playAudio}>
                                            <PlayArrow/>
                                        </IconButton>
                                    </>
                                );
                            }
                        })()
                    }
                    </>
                    
                </CardContent>
                {
                    (() => {
                        if (status === "selecting") {
                            return (
                                <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
                                    <Button size="small" onClick={handlePostSelection}>Select</Button>
                                </CardActions>
                            );
                        } else if (status === "voting" && !votedBy.includes(currentUser?._id)) {
                            return (
                                <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
                                    <Button size="small" onClick={() => makeBattleVote(battleId, postNScore, 1, currentUser?._id)}>Free Vote (+1)</Button>
                                </CardActions>
                            );
                        }
                    })()
                }
            </Card>
        </>
    );
}


export default memo(PostItem);

