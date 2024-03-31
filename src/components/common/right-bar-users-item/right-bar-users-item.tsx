import { Person2 } from '@mui/icons-material';
import { Card, CardHeader, Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export default function RightBarUsersItem(props: {
    id: string;
    avatar: string;
    nickname: string;
    description: string;
}) {
    const {id, avatar, nickname, description} = props;
    const navigate = useNavigate();
    const { t } = useTranslation("objects");

    return (
        <Card sx={{mb: 1, boxShadow: 10, borderRadius: 5}}>
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
                action={
                    <Button
                        startIcon={<Person2/>}
                        variant="outlined" size="small"
                        sx={{ mt: 0.5 }}
                        onClick={() => navigate(`/app/profile/${id}`)}
                    >
                        {t('rightbar_item.open_profile')}
                    </Button>
                }
            />
        </Card>
    );
}
