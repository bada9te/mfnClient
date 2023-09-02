import { Person2 } from '@mui/icons-material';
import { Card, CardActions, CardMedia, CardHeader, Avatar, Skeleton, Button, ButtonGroup, Box } from '@mui/material';
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
                
                <CardActions sx={{m: 0, p: 0}}>
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                        <ButtonGroup variant="contained" sx={{ boxShadow: 0 }}>
                            <Button
                                startIcon={<Person2/>}
                                sx={{ 
                                    borderTopLeftRadius: 50,
                                    borderBottomLeftRadius: 50,
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0
                                }} 
                                variant="contained" size="small"
                                onClick={() => navigate(`/profile/${id}`)}
                            >
                                Open profile 
                            </Button>
                        </ButtonGroup>
                    </Box>
                </CardActions>
            </Card>
        </>
    );
}


export default RightBarUsersItem;