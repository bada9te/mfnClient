import { memo, useEffect, useState } from 'react';
import getTimeLeft from '@/utils/common-functions/getTimeLeft';
import { Card, CardActions, CardContent, Typography, Box, Stack, Avatar } from '@mui/material';
import battleImg from '@/assets/icons/battle-disk.png';
import { useTranslation } from "react-i18next";


const BattleItem = (props) => {
    const { post1, post2, willFinishAt, title, post1Score, post2Score, winner, finished 
        //id, createdAt
    } = props;
    const [ timeleft, setTimeLeft ] = useState(new Date(willFinishAt).getTime() - new Date().getTime());
    const { t } = useTranslation("objects");

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
        <Card sx={{ boxShadow: 5, my: 3, p: 0, borderRadius: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center',  alignItems: 'center', fontSize: 24,  p: 1, boxShadow: 10, backgroundColor: '#1C94A4', color: 'white' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mx: 1 }}>
                    <Typography variant='span' sx={{ 
                        backgroundColor: 'white',
                        color: 'black', 
                        borderRadius: '50%', 
                        width: '40px', 
                        height: '40px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: 5,
                    }}>{post1Score}</Typography>
                    <Typography variant='span'>{title}</Typography>
                    <Typography variant='span' sx={{ 
                        backgroundColor: 'white',
                        color: 'black', 
                        borderRadius: '50%', 
                        width: '40px', 
                        height: '40px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: 5,
                    }}>{post2Score}</Typography>
                </Box>
            </Box>

            <CardContent sx={{py: 1, px: 0}}>
                <Stack 
                    spacing={{ xs: 1, sm: 2 }} 
                    sx={{width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 9999, p: 1.5}} 
                    direction={{sm: "column", xl: "row"}} 
                    useFlexGap 
                    flexWrap="wrap"
                >
                    {post1}
                    <Avatar src={battleImg} sx={{width: '100px', height: '100px', boxShadow: 10, m: 3}} alt="battle"></Avatar>
                    {post2}
                </Stack>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                    finished 
                    ?
                    <Typography variant='span'>
                        {
                            (() => {
                                if (post1.props.id === winner) {
                                    return (<>{t('battle.finished.winner')} "<b>{post1.props.title}</b>"</>);
                                } else if (post2.props.id === winner) {
                                    return (<>{t('battle.finished.winner')} "<b>{post2.props.title}</b>"</>);
                                } else if (!post1.props.id || !post2.props.id) {
                                    return (<>{t('battle.finished.unknown')}, <b>{post1Score}:{post2Score}</b></>);
                                } else {
                                    return (<>{t('battle.finished.draw')}</>);
                                }
                            })()
                        }
                    </Typography>
                    :
                    <Typography>{getTimeLeft(timeleft)}</Typography>
                }
            </CardActions>
        </Card>
        
    );
}


export default memo(BattleItem);