import { Card, CardActions, CardMedia, CardHeader, Avatar, Skeleton, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const RightBarUsersItem = (props) => {
    const {id, avatar, background, nickname, description} = props;
    const navigate = useNavigate();

    return (
        <>
            <Card sx={{mb: 1, boxShadow: 3}}>
                <CardHeader
                    avatar={
                        <Avatar 
                            src={avatar.endsWith('/') ? "NULL" : avatar} 
                            sx={{bgcolor: "gray", boxShadow: 3}} 
                            aria-label="recipe"
                            alt={nickname}
                        />
                    }
                    title={nickname}
                    subheader={description}
                />
                {
                    (() => {
                        if (background?.endsWith('/') || !background) {
                            return (
                                <Skeleton variant="rectangular" width={400} height={160} />
                            );
                        } else {
                            return (
                                <CardMedia
                                    component="img"
                                    height="160"
                                    width="400"
                                    image={background}
                                    alt={`${nickname}'s background`}
                                />
                            );
                        }
                    })()
                }
                
                <CardActions>
                    <Stack direction="column" spacing={0.75} mx={1} my={0.5}>
                        <Typography
                            fontSize={16} sx={{ cursor: 'pointer' }}
                            component="div" fontWeight="bold" 
                            color="primary" onClick={() => navigate(`/profile/${id}`)}
                        >
                            Open profile
                        </Typography>
                    </Stack>
                </CardActions>
            </Card>
        </>
    );
}


export default RightBarUsersItem;