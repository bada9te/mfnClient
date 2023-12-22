import { memo, useEffect, useState } from 'react';
import getTimeLeft from '../../../common-functions/getTimeLeft/getTimeLeft';
import { Card, CardActions, CardContent, Typography, Box, Stack, Avatar } from '@mui/material';
import battleImg from '../../../images/icons/battle-disk.png';



const BattleItem = (props) => {
    const {
        //id, 
        post1, 
        post2, 
        //createdAt, 
        willFinishAt, 
        title, 
        post1Score, 
        post2Score, 
        //bg1, 
        //bg2, 
        winner, 
        finished
    } = props;
    const [timeleft, setTimeLeft] = useState(new Date(willFinishAt).getTime() - new Date().getTime());

    useEffect(() => {
        if (!finished) {
            //console.log(new Date(willFinishAt).getTime() - new Date().getTime())
            if (timeleft - 1000 > 0) { 
                let interval = setInterval(() => {
                    setTimeLeft(timeleft - 1000);
                }, 1000);
        
                return () => { clearInterval(interval); }
            } else {
                //dispatch(removeFromInProgress(id));
            }
        }
    }, [timeleft, finished]);


    return (
        <>
            <Card sx={{ boxShadow: 5, my: 3, p: 0, mx: {xs: 1, md: 2, sm: 1 }, borderRadius: 5 }}>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    fontSize: 24, 
                    p: 1,
                    boxShadow: 10,
                    backgroundColor: '#1C94A4',
                    color: 'white',
                }}>
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

                <CardContent sx={{py: 1, px: 0}}>
                    <Stack 
                        spacing={{ xs: 1, sm: 2 }} 
                        sx={{width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 9999}} 
                        direction={{sm: "column", xl: "row"}} 
                        useFlexGap 
                        flexWrap="wrap"
                    >
                        {post1}
                        <Avatar src={battleImg} sx={{width: '150px', height: '150px', boxShadow: 10}} alt="battle"></Avatar>
                        {post2}
                    </Stack>
                </CardContent>

                <CardActions sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
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
                                        } else if (!post1.props.id || !post2.props.id) {
                                            return (
                                                <>
                                                    Finished, <b>{post1Score}:{post2Score}</b>
                                                </>
                                            );
                                        }
                                        else {
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