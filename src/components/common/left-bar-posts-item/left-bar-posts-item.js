import { Card, Avatar, CardMedia, CardActions, CardHeader, Stack, Typography, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const LeftBarPostsItem = (props) => {
    const {id, title, description, user, image} = props;
    const navigate = useNavigate();

    return (
        <Card sx={{mb: 1, boxShadow: 3}}>
            <CardHeader
                avatar={
                    <Avatar 
                        src={user[2].endsWith('/') ? "NULL" : user[2]} 
                        sx={{bgcolor: "gray", boxShadow: 3}} 
                        aria-label="recipe"
                    />
                }
                title={user[1]}
                subheader={`${title} - ${description}`}
            />
            {
                (() => {
                    if (image?.endsWith('/') || !image) {
                        return (
                            <Skeleton variant="rectangular" width={400} height={160} />
                        );
                    } else {
                        return (
                            <CardMedia
                                component="img"
                                height="160"
                                width="400"
                                image={image}
                                alt={`${title} - ${description}`}
                            />
                        );
                    }
                })()
            }
            
            <CardActions>
                <Stack direction="column" spacing={0.75} sx={{display: 'flex', my: 0.5, mx: 1}}>
                    <Typography
                        fontSize={16} sx={{ cursor: 'pointer' }}
                        component="div" fontWeight="bold" 
                        color="primary" onClick={() => navigate(`/track/${id}`, {state: {trackId: id, ownerId: user[0]}})}
                    >
                        See track
                    </Typography>
                    <Typography
                        fontSize={16} sx={{ cursor: 'pointer' }}
                        component="div" fontWeight="bold" 
                        color="primary" onClick={() => navigate(`/profile/${user[0]}`)}
                    >
                        Open profile
                    </Typography>
                </Stack>
            </CardActions>
        </Card>
    );
}


export default LeftBarPostsItem;