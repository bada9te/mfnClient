import { memo } from 'react';
import {Card, CardActions, CardContent, Box, Stack, Avatar, Skeleton} from '@mui/material';
import battleImg from '@/assets/icons/battle-disk.png';
import PostItemUnavailable from "@/components/common/post-item/post-item-unavailable.tsx";


const BattleItem = () => {
    return (
        <Card sx={{ boxShadow: 5, my: 3, p: 0, borderRadius: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center',  alignItems: 'center', fontSize: 24,  boxShadow: 10, backgroundColor: '#1C94A4', color: 'white' }}>
                <Skeleton variant="text" width={'97%'} sx={{ fontSize: '2.75rem', borderRadius: '18px' }} />
            </Box>

            <CardContent sx={{py: 1, px: 0}}>
                <Stack
                    spacing={{ xs: 1, sm: 2 }}
                    sx={{width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 9999, p: 1.5}}
                    direction={{sm: "column", xl: "row"}}
                    useFlexGap
                    flexWrap="wrap"
                >
                    <PostItemUnavailable hideText />
                    <Avatar src={battleImg} sx={{width: '100px', height: '100px', boxShadow: 10, m: 3}} alt="battle"></Avatar>
                    <PostItemUnavailable hideText />
                </Stack>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Skeleton variant="text" width={'98%'} sx={{ fontSize: '2rem', borderRadius: '18px' }} />
            </CardActions>
        </Card>

    );
}


export default memo(BattleItem);