import { Avatar, Box, Card, CardActions, CardContent, CardHeader, IconButton, Stack, Typography } from "@mui/material";
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
            background: 'rgb(128,237,153)',
            //backdropFilter: 'blur(5px)',
            color: 'black',
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
                    <Stack useFlexGap flexWrap="wrap" flexDirection="row">

                        {
                            item?.github && item.github.map(object => {
                                return Object.keys(object).map((i, key) => {
                                    return (
                                        <IconButton key={key} href={object[i]} target="_blank" sx={{borderRadius: 25}}>
                                            <GitHub sx={{mr: 0.5}}/>
                                            <Typography>{i}</Typography>
                                        </IconButton>
                                    );
                                });
                            })
                        }

                        {
                            item?.instagram && item.instagram.map(object => {
                                return Object.keys(object).map((i, key) => {
                                    return (
                                        <IconButton key={key} href={object[i]} target="_blank" sx={{borderRadius: 25}}>
                                            <Instagram sx={{mr: 0.5}}/>
                                            <Typography>{i}</Typography>
                                        </IconButton>
                                    );
                                })
                            })
                        }
                    </Stack>
                </CardActions>
            }
        </Card>
    );
}

export default WelcomePageCard;