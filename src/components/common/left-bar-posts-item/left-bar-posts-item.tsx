import { Person2, Visibility } from '@mui/icons-material';
import { Card, Avatar, CardMedia, CardActions, CardHeader, Skeleton, ButtonGroup, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";


export default function LeftBarPostsItem(props: {
    id: string;
    title: string;
    description: string;
    user: {
        _id: string;
        nick: string;
        avatar: string;
    };
    image: string;
}) {
    const {id, title, description, user, image} = props;
    const navigate = useNavigate();
    const { t } = useTranslation("objects");

    return (
        <Card sx={{ mb: 1, boxShadow: 10, borderRadius: 5 }}>
            <CardHeader
                avatar={
                    <Avatar 
                        src={user.avatar.endsWith('/') ? "NULL" : user.avatar} 
                        sx={{bgcolor: "gray", boxShadow: 3}} 
                        aria-label="recipe"
                    />
                }
                title={user.nick}
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
                        startIcon={<Person2/>}
                        sx={{ borderRadius: 0 }}
                        variant="contained" size="small" 
                        onClick={() => navigate(`/app/profile/${user._id}`)}
                    >
                        {t('leftbar_item.open_profile')}
                    </Button>

                    <Button
                        startIcon={<Visibility/>}
                        sx={{ 
                            borderTopRightRadius: 50,
                            borderBottomRightRadius: 0,
                        }} 
                        variant="contained" size="small"
                        onClick={() => navigate(`/app/track/${id}/${user._id}`)}
                    >
                        {t('leftbar_item.see_track')} 
                    </Button>
                </ButtonGroup>
            </CardActions>
        </Card>
    );
}
