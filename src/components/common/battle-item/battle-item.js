import { memo, useEffect, useState } from 'react';
import getTimeLeft from '../../../common-functions/getTimeLeft';
import { Card, CardActions, CardContent, Typography, Box, Stack } from '@mui/material';
import battleImg from '../../../images/battle-disk.png';
import userSocket from '../../../socket/user/socket-user';
import { useDispatch } from 'react-redux';
import { socketAddVote } from '../../containers/battles-container/battlesContainerSlice';


const BattleItem = (props) => {
    const {id, post1, post2, createdAt, willFinishAt, title, post1Score, post2Score, bg1, bg2, winner, finished} = props;
    const [timeleft, setTimeLeft] = useState(new Date(willFinishAt).getTime() - new Date().getTime());
    const dispatch = useDispatch();

    useEffect(() => {
        if (!finished) {
            if (timeleft - 1000 > 0) { 
                let interval = setInterval(() => {
                    setTimeLeft(timeleft - 1000);
                }, 1000);
        
                return () => {
                    clearInterval(interval);
                }
            }
        }
    });

    useEffect(() => {
        userSocket.on(`battle-${id}-voted`, (data) => {
            //console.log(data);
            dispatch(socketAddVote(data));
        });

        return () => {
            userSocket.off(`battle-${id}-voted`);
        }
    }, [dispatch, id]);


    return (
        <>
            <Card sx={{ boxShadow: 3, mb: 3, p: 0, mx: 0 }}>
                <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        fontSize: 24, 
                        p: 1,
                        backgroundColor: 'rgba(230,230,230,0.3)',
                        boxShadow: 1
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        mx: 1
                    }}>
                        <Typography variant='span'>{post1Score}</Typography>
                        <Typography variant='span'>{title}</Typography>
                        <Typography variant='span'>{post2Score}</Typography>
                    </Box>
                </Box>

                <CardContent>
                    <Box sx={{ width: '100%' }}>
                        <Stack spacing={{ xs: 1, sm: 2 }} sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 9999}} direction="row" useFlexGap flexWrap="wrap">
                            {post1}
                            <img className="p-3" src={battleImg} width="200px" height="200px" alt="battle"/>
                            {post2}
                        </Stack>
                    </Box>
                </CardContent>

                <CardActions sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: 'rgba(230,230,230,0.3)',
                    }}
                >
                    {
                        finished 
                        ?
                        <>
                            <Typography variant='span'>
                                {
                                    (() => {
                                        if (post1.props.id === winner) {
                                            return (
                                                <>
                                                    Finished, the winner is "<b>{post1.props.title}</b>"
                                                </>
                                            );
                                            
                                        } else if (post2.props.id === winner) {
                                            return (
                                                <>
                                                    Finished, the winner is "<b>{post2.props.title}</b>"
                                                </>
                                            );
                                        } else {
                                            return (
                                                <>
                                                    Finished with <b>draw</b>
                                                </>
                                            );
                                        }
                                    })()
                                }
                            </Typography>
                        </>    
                        :
                        <>
                            <Typography>{getTimeLeft(timeleft)}</Typography>
                        </>
                    }
                </CardActions>
            </Card>
        </>
    );
}


export default memo(BattleItem);