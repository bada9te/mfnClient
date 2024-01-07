import { Avatar, Box, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import { GitHub, Instagram } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const WelcomePageCard = props => {
    const { item } = props;
    const { t } = useTranslation("pages");


    return (
        <Card sx={{ 
            width: {xs: '95%', sm: '375px', md: '400px'}, 
            boxShadow: 5, 
            borderRadius: 5,
            transition: '500ms', 
            ":hover": { transform: 'scale(1.025)', boxShadow: 10 }
        }}>
            <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center', p: 1}}>
                <Avatar src={item.iconUrl} alt={item.title} sx={{ m: 1, boxShadow: 5 }}/>
            </Box>
            <CardHeader title={t(`welcome.card.${item.id}.title`)}/>
            <CardContent>
                <Typography>{t(`welcome.card.${item.id}.description`)}</Typography>
            </CardContent>
            {
                (item?.github || item?.instagram)
                &&
                <CardActions>
                    {item?.github && <IconButton href={item.github} target="_blank"><GitHub/></IconButton>}

                    {item?.instagram && <IconButton><Instagram/></IconButton>}
                </CardActions>
            }
        </Card>
    );
}

export default WelcomePageCard;