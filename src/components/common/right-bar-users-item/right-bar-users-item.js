import { Person2 } from '@mui/icons-material';
import { Card, CardActions, CardMedia, CardHeader, Avatar, Skeleton, Button, ButtonGroup, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const RightBarUsersItem = (props) => {
    const {id, avatar, background, nickname, description} = props;
    const navigate = useNavigate();
    const { t } = useTranslation("bars");

    return (
        <>
            <Card sx={{mb: 1, boxShadow: 5, borderRadius: 5}}>
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
                                    borderBottomLeftRadius: 0,
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0,
                                    pl: 2
                                }} 
                                variant="contained" size="small"
                                onClick={() => navigate(`/app/profile/${id}`)}
                            >
                                {t('rightbar.item.open_profile')}
                            </Button>
                        </ButtonGroup>
                    </Box>
                </CardActions>
            </Card>
        </>
    );
}


export default RightBarUsersItem;