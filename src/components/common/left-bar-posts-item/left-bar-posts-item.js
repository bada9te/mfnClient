import { Person2, Visibility } from '@mui/icons-material';
import { Card, Avatar, CardMedia, CardActions, CardHeader, Skeleton, ButtonGroup, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const LeftBarPostsItem = (props) => {
    const {id, title, description, user, image} = props;
    const navigate = useNavigate();

    return (
        <Card sx={{mb: 1, boxShadow: 5, borderRadius: 5}}>
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
            
            <CardActions sx={{m: 0, p: 0}}>
                <ButtonGroup variant="contained" sx={{ boxShadow: 0 }}>
                    <Button 
                        startIcon={<Visibility/>}
                        sx={{ borderRadius: 0 }}
                        variant="contained" size="small" 
                        onClick={() => navigate(`/track/${id}`, {state: {trackId: id, ownerId: user[0]}})}
                    >
                        See track
                    </Button>

                    <Button
                        startIcon={<Person2/>}
                        sx={{ 
                            borderTopRightRadius: 50,
                            pr: 2
                        }} 
                        variant="contained" size="small"
                        onClick={() => navigate(`/profile/${user[0]}`)}
                    >
                        Open profile 
                    </Button>
                </ButtonGroup>
            </CardActions>
        </Card>
    );
}


export default LeftBarPostsItem;