import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';

import { Tooltip, Button, Avatar, Card, CardHeader, IconButton, CardMedia, CardContent, Box, Typography, Skeleton, ButtonGroup } from "@mui/material";
import { Favorite, FavoriteBorder, CommentOutlined, Bookmark, BookmarkBorder, PlayArrow, Pause, Loop, VolumeOff, VolumeUp, CheckCircle, HowToVote } from "@mui/icons-material";
import PostItemDropDown             from './post-item-dropdown/post-item-dropdown';

import { useMutation, useReactiveVar } from '@apollo/client';
import { POSTS_SAVED_BY_USER_QUERY, POST_SWITCH_IN_SAVED_MUTATION, POST_SWITCH_LIKE_MUTATION } from '../../../graphql-requests/posts';
import { audioPlayerState } from '../audio-player/reactive';
import { userSelectContainerState } from '../../containers/user-select-container/reactive';
import { userSelectModalState } from '../../modals/user-select-modal/reactive';
import { reportFormState } from '../../forms/report/reactive';
import { reportModalState } from '../../modals/report-modal/reactive';
import { confirmContainerState } from '../../containers/confirm-container/reactive';
import { confirmModalState } from '../../modals/confirm-modal/reactive';
import { commentsModalState } from '../../modals/comments-modal/reactive';
import { commentsContainerState } from '../../containers/comments-container/reactive';
import { baseState } from '../../baseReactive';
import { postsContainerState } from '../../containers/posts-container/reactive';
import { useTranslation } from "react-i18next";


const PostItem = (props) => {
    const { base, addons } = props;
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const [likedBy, setLikedBy] = useState(base.likedBy);
    const [savedBy, setSavedBy] = useState(base.savedBy);

    const { user: currentUser } = useReactiveVar(baseState);
    const audioPlayer = useReactiveVar(audioPlayerState);
    const { maxCountPerPage } = useReactiveVar(postsContainerState);

    const { t } = useTranslation("objects");

    // nav
    const navigate = useNavigate();
    
    const [ switchLike ] = useMutation(POST_SWITCH_LIKE_MUTATION);
    const [ switchInSaved ] = useMutation(POST_SWITCH_IN_SAVED_MUTATION);

    // handle likes
    const onLikesChanged = async(e, value) => {
        if (addons.status === "upload") return;

        await switchLike({
            variables: {
                input: {
                    userId: currentUser._id,
                    postId: base._id
                },
            },
        }).then(({data}) => {
            setLikedBy(data.postSwitchLike.likedBy);
        });
    }
    
    // add to saved or remove from saved
    const switchPostInSaved = async(e, value) => {
        if (addons.status === "upload") return;
        
        await switchInSaved({
            update: (cache, { data }) => {
                const postData = data.postSwicthInSaved;
                let cachedData = cache.readQuery({ 
                    query: POSTS_SAVED_BY_USER_QUERY, 
                    variables: { user: currentUser._id, offset: 0, limit: maxCountPerPage } 
                });

                let savedPosts = [];
                if (cachedData) {
                    savedPosts = JSON.parse(JSON.stringify(cachedData.postsSavedByUser.posts));
                }
                const itemExists = savedPosts.map(i => i._id).includes(postData._id);

                if (itemExists) {
                    savedPosts = savedPosts.filter(i => i._id !== postData._id);
                } else {
                    savedPosts.push(postData);
                }

                cache.writeQuery({
                    query: POSTS_SAVED_BY_USER_QUERY, 
                    variables: { user: currentUser._id, offset: 0, limit: maxCountPerPage },
                    data: {
                        postsSavedByUser: {
                            posts: savedPosts,
                            count: savedPosts.length,
                        }
                    }
                })
            },
            variables: {
                input: {
                    userId: currentUser._id,
                    postId: base._id
                }
            }
        }).then(({ data }) => {
            setSavedBy(data.postSwicthInSaved.savedBy);
        });
    }

    // switch loop
    const switchLoop = () => {
        audioPlayerState({...audioPlayer, loop: !audioPlayer.loop});
    }

    // play aduio
    const playAudio = () => {
        audioPlayerState({ 
            ...audioPlayer, 
            src: base.audio, 
            isPlaying: true, 
            currentTrack: { ...base, ...addons }, 
            controlsLocked: false 
        });
    }

    // pause audio
    const pauseAudio = () => {
        audioPlayerState({ ...audioPlayer, isPlaying: false });
    }

    // mute unmute
    const handleMuteUnmute = () => {
        audioPlayerState({ ...audioPlayer, isMuted: !audioPlayer.isMuted });
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
            navigate(`/app/profile/${base.owner._id}`)
        }
    }

    // open user select modal to share
    const shareTrack = () => {
        if (addons.status !== "upload") {
            userSelectContainerState({ ...userSelectContainerState(), sharedItem: base._id, selectType: 'postShare' });
            userSelectModalState({ ...userSelectModalState(), isShowing: true });
        }
    }

    // report track
    const reportTrack = () => {
        if (addons.status !== "upload") {
            reportFormState({ ...reportFormState(), reportingItemId: base._id });
            reportModalState({ ...reportModalState(), isShowing: true });
        }
    }

    // delete post
    const deleteTrack = () => {
        if (addons.status !== "upload") {
            confirmModalState({ ...confirmModalState(), isShowing: true });
            confirmContainerState({
                ...confirmContainerState(),
                actionType: "delete-post",
                itemId: base._id,
                text: "By confirming this, you agree that your post will be removed without any ability to restore.",
                title: "Confirm track deletion",
            });
        }
    }

    // comments modal
    const switchShowCommentsModal = () => {
        if (addons.status !== "upload") {
            commentsModalState({ ...commentsModalState(), isShowing: true });
            commentsContainerState({ ...commentsContainerState(), commentsIds: base.comments, postId: base._id });
        }
    }

    // open track details page
    const openTrackDetailsPage = () => {
        if (addons.status !== "upload") {
            navigate(`/app/track/${base._id}/${base.owner._id}`)
        }
    }

        
    // init
    useEffect(() => {
        if (currentUser && currentUser._id !== "") {
            likedBy.find(item => item._id === currentUser?._id) ? setIsLiked(true) : setIsLiked(false);
            savedBy.find(item => item._id === currentUser?._id) ? setIsSaved(true) : setIsSaved(false);
        }
    }, [likedBy, currentUser?.savedPosts, currentUser, currentUser?._id, base._id, savedBy]);

    

    return (
        <Card sx={{
            width: {xs: '95%', sm: '375px', md: '400px'}, 
            boxShadow: 10, 
            borderRadius: addons.status === "in-player" ? 0 : 5,
            transition: '500ms',
        }}>
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
                        handlers={{ audioDownload, shareTrack, reportTrack, deleteTrack }}
                    />
                }
            />

            {/* ################################# BLURED PANEL ################################# */}
            <Box sx={{ position: 'relative' }}>
                {
                    base.img?.endsWith('/') || !base.img
                    ?
                    <Skeleton variant="rectangular" height={160} sx={{ width: {xs: '100%', md: '400px'} }}/>
                    :
                    <CardMedia component="img" height="160" width={{xs: '100%', md: '400px'}} image={base.img} alt={base.title}/>
                }
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', bgcolor: 'rgba(0,0,0,0.3)', color: 'white', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backdropFilter: 'blur(5px)' }}>
                    <Box>
                        <Typography variant='h5'>{base.title}</Typography>
                        <Typography variant='p'>{base.description}</Typography>
                    </Box>

                    {/* ################################# LIKE SAVE COMMENT ################################# */}
                    {
                        addons.status !== "in-player"
                        ?
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Tooltip title={t('post.save')}>
                                    <span>
                                        <IconButton 
                                            aria-label="bookmark" 
                                            onClick={switchPostInSaved} 
                                            sx={{ color: 'white' }}
                                            disabled={currentUser && currentUser._id !== "" ? false : true}
                                        >
                                            { isSaved ? <Bookmark/> : <BookmarkBorder/> }
                                        </IconButton>
                                    </span>
                                </Tooltip>
                                <Typography sx={{ fontSize: 12 }}>{savedBy.length}</Typography>
                            </Box>
                            {
                                addons.commentsAllowed
                                &&
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Tooltip title={t('post.comment')}>
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
                            }
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Tooltip title={t('post.like')}>
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
                                <Typography sx={{ fontSize: 12 }}>{likedBy.length}</Typography>
                            </Box>
                        </Box>
                        :
                        <Button variant="contained" sx={{ boxShadow: 10 }} onClick={openTrackDetailsPage}>
                            {t('post.track_details')}
                        </Button>
                    }
                </Box>
            </Box>
            
            {/* ################################# POST ACTION BUTTONS ################################# */}
            {
                addons.status !== "in-player"
                &&
                <CardContent sx={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    m: 0, p: 0, paddingBottom: 0, 
                    "&:last-child": { paddingBottom: 0 }
                }}>
                    {
                        (() => {
                            if (audioPlayer.src === base.audio && audioPlayer.isPlaying) {
                                return (
                                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>   
                                        <ButtonGroup variant="contained" sx={{ boxShadow: 0 }}>
                                            <Button startIcon={<Pause/>} sx={{ borderRadius: 0 }} variant="contained" size="small" onClick={pauseAudio} disabled={audioPlayer.controlsLocked ? true : false}>
                                                {t('post.pause')}
                                            </Button>

                                            <Button 
                                                startIcon={<Loop/>}
                                                sx={{ 
                                                    backgroundColor: audioPlayer.loop ? '#1BA39C' : '', 
                                                    color: audioPlayer.loop ? 'white' : '',
                                                    borderTopRightRadius: 50,
                                                    borderBottomRightRadius: 0,
                                                }} 
                                                variant="contained" size="small" onClick={switchLoop} 
                                                disabled={ audioPlayer.controlsLocked ? true : false }
                                            >
                                                {t('post.loop')} 
                                            </Button>
                                        </ButtonGroup>
                                        <ButtonGroup variant="contained" sx={{ boxShadow: 0 }}>
                                            <Button 
                                                startIcon={ audioPlayer.isMuted || audioPlayer.volume === 0 ? <VolumeOff/> : <VolumeUp/> }
                                                sx={{ 
                                                    backgroundColor: audioPlayer.isMuted || audioPlayer.volume === 0 ? '#f44336' : '',
                                                    color: audioPlayer.isMuted ? 'white' : '',
                                                    borderTopLeftRadius: 50,
                                                    borderBottomLeftRadius: 0,
                                                    borderTopRightRadius: 0,
                                                }} 
                                                variant="contained" size="small" onClick={handleMuteUnmute} 
                                                disabled={audioPlayer.controlsLocked ? true : false}
                                            >
                                                {t('post.mute')}
                                            </Button>
                                        </ButtonGroup>
                                    </Box>
                                );
                            } else {
                                return (
                                    <ButtonGroup variant="contained" sx={{ boxShadow: 0 }} >
                                        <Button 
                                            startIcon={<PlayArrow/>}
                                            sx={{ 
                                                borderTopRightRadius: ["selecting", "voting"].includes(addons.status) && !addons?.votedBy?.includes(currentUser?._id) ? 0 : 50,
                                                borderBottomRightRadius: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 25,
                                            }} 
                                            disabled={!base.audio}
                                            variant="contained" size="small" onClick={playAudio}
                                        >
                                            {t('post.play')}
                                        </Button>
                                        {
                                            (() => {
                                                if (addons.status === "selecting") {
                                                    return (
                                                        <Button size="small" onClick={() => addons.selectPost({base, addons})} startIcon={<CheckCircle/>} sx={{ borderTopRightRadius: 50, borderBottomRightRadius: 0, borderBottomLeftRadius: 25, backgroundColor: '#36B2AC' }}>
                                                            {t('post.select')}
                                                        </Button>
                                                    );
                                                } else if (addons.status === "voting" && !addons.votedBy.includes(currentUser?._id)) {
                                                    return (
                                                        <Button size="small" onClick={() => addons.makeBattleVote(addons.battleId, addons.postNScore, 1, currentUser?._id)} startIcon={<HowToVote/>} sx={{ borderTopRightRadius: 50, borderBottomRightRadius: 0, borderBottomLeftRadius: 25, backgroundColor: '#36B2AC' }}>
                                                            {t('post.vote+1')}
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
                </CardContent>
            }
        </Card>
    );
}

export default memo(PostItem);