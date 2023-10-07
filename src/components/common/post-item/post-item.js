import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import userSocket from '../../../socket/user/socket-user';

import { Tooltip, Button, Avatar, Card, CardHeader, IconButton, CardMedia, CardContent, CardActions, Box, Typography, Skeleton, ButtonGroup } from "@mui/material";
import { Favorite, FavoriteBorder, CommentOutlined, Bookmark, BookmarkBorder, PlayArrow, Pause, Loop, VolumeOff, VolumeUp, CheckCircle, HowToVote }                   from "@mui/icons-material";
import PostItemDropDown             from './post-item-dropdown/post-item-dropdown';
import { useDispatch, useSelector } from "react-redux";
import { updateCommentsSocket, updateLikesSocket, updateSavesSocket } from "../../containers/posts-container/postsContainerSlice";
import { fetchComments }                                              from "../../containers/comments-container/commentsContainerSlice";
import { setIsShowing as setCommentsModalIsShowing }                  from "../../modals/comments-modal/commentsModalSlice";
import { setCurrentTrack, setIsMuted, setIsPlaying, setLoop, setSrc } from "../audio-player/audioPlayerSlice";
import { setIsShowing as setUserSelectModalIsShowing } from '../../modals/user-select-modal/userSelectModalSlice';
import { setSelectType, setSharedItem }                from '../../containers/user-select-container/userSelectContainerSlice';
import { setReportingItemId }                          from '../../forms/report/reportFormSlice';
import { setIsShowing as setReportModalIsShowing }     from '../../modals/report-modal/reportModalSlice';
import { setIsShowing as setConfirmModalIsShowing }    from '../../modals/confirm-modal/confirmModalSlice';
import { setActionType, setItemId, setText, setTitle } from '../../containers/confirm-container/confirmContainerSlice';


import changeLikes from './functions/changeLikes';
import changeSaves from './functions/changeSaves';



const PostItem = (props) => {
    const {
        base, addons
    } = props;
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false)

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state?.base?.user);
    const currentAudio = useSelector(state => state.audioPlayer.src);
    const isPlaying = useSelector(state => state.audioPlayer.isPlaying);
    const isMuted = useSelector(state => state.audioPlayer.isMuted);
    const volume = useSelector(state => state.audioPlayer.volume);
    const loop = useSelector(state => state.audioPlayer.loop);
    const controlsLocked = useSelector(state => state.audioPlayer.controlsLocked);
    const theme = useSelector(state => state.base.theme);

    // nav
    const navigate = useNavigate();
    

    // handle likes
    const onLikesChanged = async(e, value) => {
        changeLikes(addons, base, isLiked, currentUser, dispatch); 
        setIsLiked(!isLiked);
    }

    // switch loop
    const switchLoop = () => {
        dispatch(setLoop(!loop));
    }

    // play aduio
    const playAudio = () => {
        dispatch(setSrc(base.audio));
        dispatch(setIsPlaying(true));
        dispatch(setCurrentTrack(props));
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
    const audioDownload = () => {
        if (addons.status !== "upload") {
            saveAs(base.audio, `${base.owner.nick} - ${base.title}`);
        }
    }
    // open owner profile
    const goToProfile = () => {
        if (addons.profileLinkAccessable) {
            navigate(`/profile/${base.owner._id}`)
        }
    }

    // open user select modal to share
    const shareTrack = () => {
        if (addons.status !== "upload") {
            dispatch(setSharedItem(base._id));
            dispatch(setSelectType('postShare'));
            dispatch(setUserSelectModalIsShowing(true));
        }
    }

    // report track
    const reportTrack = () => {
        if (addons.status !== "upload") {
            dispatch(setReportingItemId(base._id));
            dispatch(setReportModalIsShowing(true));
        }
    }

    // delete post
    const deleteTrack = () => {
        if (addons.status !== "upload") {
            dispatch(setConfirmModalIsShowing(true));
            dispatch(setActionType("delete-post"));
            dispatch(setItemId(base._id));
            dispatch(setText("By confirming this, you agree that your post will be removed without any ability to restore."));
            dispatch(setTitle("Confirm track deletion"));
        }
    }

    // comments modal
    const switchShowCommentsModal = () => {
        if (addons.status !== "upload") {
            dispatch(setCommentsModalIsShowing(true));
            dispatch(fetchComments({
                postId: base._id,
                postOwnerId: base.owner._id,
                commentsIds: base.comments,
            }));
        }
    }

    // add to saved or remove from saved
    const switchInSaved = async() => {
        setIsSaved(!isSaved);
        changeSaves(base, isSaved, currentUser, theme, dispatch);
    }
        
    // init
    useEffect(() => {
        if (currentUser && currentUser._id !== "") {
            base.likedBy.find(likedById => likedById === currentUser?._id) ? setIsLiked(true) : setIsLiked(false);
            base.savedBy.find(savedById => savedById === currentUser?._id) ? setIsSaved(true) : setIsSaved(false);
        }
    }, [base.likedBy, currentUser?.savedPosts, currentUser, currentUser?._id, base._id, base.savedBy]);

    /*
    // socket
    useEffect(() => {
        userSocket.on(`post-${base._id}-was-liked`, (data) => {
            if (data.sender === currentUser._id) setIsLiked(true);
            dispatch(updateLikesSocket({
                userId: data.sender,
                postId: base._id,
            }));
        });
        userSocket.on(`post-${base._id}-was-unliked`, (data) => {
            if (data.sender === currentUser._id) setIsLiked(false);
            dispatch(updateLikesSocket({
                userId: data.sender,
                postId: base._id,
            }));
        });
        userSocket.on(`post-${base._id}-was-saved`, (data) => {
            if (data.sender === currentUser._id) setIsSaved(true);
            dispatch(updateSavesSocket({
                userId: data.sender,
                postId: base._id,
            }));
        });
        userSocket.on(`post-${base._id}-was-unsaved`, (data) => {
            if (data.sender === currentUser._id) setIsSaved(false);
            dispatch(updateSavesSocket({
                userId: data.sender,
                postId: base._id,
            }));
        });
        userSocket.on(`post-${base._id}-was-commented`, (data) => {
            dispatch(updateCommentsSocket(data));
        });
        userSocket.on(`post-${base._id}-was-uncommented`, (data) => {
            dispatch(updateCommentsSocket(data));
        });

        return () => {
            userSocket.off(`post-${base._id}-was-liked`);
            userSocket.off(`post-${base._id}-was-unliked`);
            userSocket.off(`post-${base._id}-was-saved`);
            userSocket.off(`post-${base._id}-was-unsaved`);
            userSocket.off(`post-${base._id}-was-commented`);
            userSocket.off(`post-${base._id}-was-uncommented`);
        };
    }, [base._id, dispatch, currentUser?._id]);
    */

    // for post upload form visualization
    useEffect(() => {}, [addons.commentsAllowed, addons.downloadsAllowed])




    return (
        <>
            <Card sx={{width: {xs: '100%', sm: '375px', md: '400px'}, boxShadow: 3, borderRadius: 5}}>
                <CardHeader
                    avatar={
                        <Avatar 
                            onClick={goToProfile}
                            src={base.ownerAvatar.endsWith('/') ? "NULL" : base.ownerAvatar} 
                            sx={{bgcolor: "gray", boxShadow: 3, cursor: 'pointer'}} 
                            aria-label="recipe"
                            alt={base.owner.nick}
                        />
                    }
                    title={base.owner.nick}
                    subheader={base.createdAt}
                    action={
                        <PostItemDropDown 
                            owner={base.owner._id}
                            downloadsAllowed={addons.downloadsAllowed} 
                            handlers={{
                                audioDownload,
                                shareTrack,
                                reportTrack,
                                deleteTrack,
                            }}
                        />
                    }
                />
                    <Box sx={{ position: 'relative' }}>
                        {
                            (() => {
                                if (base.img?.endsWith('/') || !base.img) {
                                    return (
                                        <Skeleton variant="rectangular" height={160} sx={{
                                            width: {xs: '100%', md: '400px'}
                                        }} />
                                    );
                                } else {
                                    return (
                                        <CardMedia component="img" height="160" width={{xs: '100%', md: '400px'}} image={base.img} alt="Paella dish"/>
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
                                <Typography variant='h5'>{base.title}</Typography>
                                <Typography variant='p'>{base.description}</Typography>
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
                                    <Typography sx={{ fontSize: 12 }}>{base.savedBy.length}</Typography>
                                </Box>
                                {
                                    addons.commentsAllowed
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
                                        <Typography sx={{ fontSize: 12 }}>{base.comments.length}</Typography>
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
                                    <Typography sx={{ fontSize: 12 }}>{base.likedBy.length}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                
                
                {
                    addons.status !== "in-player"
                    &&
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
                                    if (currentAudio === base.audio && isPlaying) {
                                        return (
                                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>   
                                                
                                                <ButtonGroup variant="contained" sx={{ boxShadow: 0 }}>
                                                    <Button 
                                                        startIcon={<Pause/>}
                                                        sx={{ borderRadius: 0 }}
                                                        variant="contained" size="small" onClick={pauseAudio} 
                                                        disabled={controlsLocked ? true : false}
                                                    >
                                                        Pause
                                                    </Button>

                                                    <Button 
                                                        startIcon={<Loop/>}
                                                        sx={{ 
                                                            backgroundColor: loop ? '#1BA39C' : '', 
                                                            color: loop ? 'white' : '',
                                                            borderTopRightRadius: 50,
                                                            pr: 2
                                                        }} 
                                                        variant="contained" size="small" onClick={switchLoop} 
                                                        disabled={controlsLocked ? true : false}
                                                    >
                                                        Loop 
                                                    </Button>
                                                </ButtonGroup>
                                                <ButtonGroup variant="contained" sx={{ boxShadow: 0 }}>
                                                    <Button 
                                                        startIcon={ isMuted || volume === 0 ? <VolumeOff/> : <VolumeUp/> }
                                                        sx={{ 
                                                            backgroundColor: isMuted || volume === 0 ? '#f44336' : '',
                                                            color: isMuted ? 'white' : '',
                                                            borderTopLeftRadius: 50,
                                                            borderBottomLeftRadius: 0,
                                                            pl: 2
                                                        }} 
                                                        variant="contained" size="small" onClick={handleMuteUnmute} 
                                                        disabled={controlsLocked ? true : false}
                                                    >
                                                        Mute
                                                    </Button>
                                                </ButtonGroup>
                                            </Box>
                                        );
                                    } else {
                                        return (
                                            <ButtonGroup variant="contained" sx={{ boxShadow: 0 }}>
                                                <Button 
                                                    startIcon={<PlayArrow/>}
                                                    sx={{ 
                                                        borderTopRightRadius: ["selecting", "voting"].includes(addons.status) && !addons?.votedBy?.includes(currentUser?._id) ? 0 : 50,
                                                        borderBottomRightRadius: 0,
                                                        borderTopLeftRadius: 0,
                                                        pr: 2
                                                    }} 
                                                    variant="contained" size="small" onClick={playAudio}
                                                >
                                                    Play
                                                </Button>
                                                {
                                                    (() => {
                                                        if (addons.status === "selecting") {
                                                            return (
                                                                <Button 
                                                                    size="small" 
                                                                    onClick={() => addons.selectPost({base, addons})}
                                                                    startIcon={<CheckCircle/>}
                                                                    sx={{ 
                                                                        borderTopRightRadius: 50,
                                                                        borderBottomRightRadius: 0,
                                                                        pr: 2,
                                                                        backgroundColor: '#36B2AC'
                                                                    }}
                                                                >
                                                                    Select
                                                                </Button>
                                                            );
                                                        } else if (addons.status === "voting" && !addons.votedBy.includes(currentUser?._id)) {
                                                            return (
                                                                <Button 
                                                                    size="small" 
                                                                    onClick={() => addons.makeBattleVote(addons.battleId, addons.postNScore, 1, currentUser?._id)}
                                                                    startIcon={<HowToVote/>}
                                                                    sx={{ 
                                                                        borderTopRightRadius: 50,
                                                                        borderBottomRightRadius: 0,
                                                                        pr: 2,
                                                                        backgroundColor: '#36B2AC'
                                                                    }}
                                                                >
                                                                    Vote (+1)
                                                                </Button>
                                                            );
                                                        }
                                                    })()
                                                }
                                            </ButtonGroup>
                                        );
                                    }
                                })()
                            }
                        </>
                    </CardContent>
                }
            </Card>
        </>
    );
}


export default memo(PostItem);

