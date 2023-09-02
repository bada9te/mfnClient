import { memo } from 'react';
import { Card, CardHeader, CardContent, Typography, Skeleton } from "@mui/material";





const PostItemUnavailable = (props) => {
    const { status } = props;

    return (
        <>
            <Card sx={{width: '400px', boxShadow: 3, borderRadius: 5}}>
                <CardHeader
                    avatar={
                        <Skeleton variant="circular" width={40} height={40} />
                    }
                    title={<Skeleton variant="text" width={100} sx={{ fontSize: '1rem' }} />}
                    subheader={<Skeleton variant="text" width={150} sx={{ fontSize: '1rem' }} />}
                />
                
                <Skeleton variant="rectangular" height={160} />
                { 
                    status !== "in-player" 
                    &&
                    <CardContent sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        m: 1, 
                        p: 0, 
                        paddingBottom: 0, 
                        "&:last-child": { paddingBottom: 0 }
                    }}>
                        <Typography sx={{textAlign: 'center', width: '100%'}}>Track is unavailable</Typography> 
                    </CardContent>
                }
            </Card>
        </>
    );
}


export default memo(PostItemUnavailable);

