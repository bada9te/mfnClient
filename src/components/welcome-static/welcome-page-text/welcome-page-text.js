import { Typography, Stack } from "@mui/material";
import logoClear from "../../../images/icons/logo_clear.png"
import WelcomePageCard from "../welcome-card/welcome-card";
import { useTranslation } from "react-i18next";

const cardsData = [
    {
        id: 'explore',
        title: '🎵 Explore',
        description: "Explore the world of custom music, share, like and comment amazing audio posts.",
        iconUrl: logoClear,
    },
    {
        id: 'anywhere',
        title: '🌐 Anywhere',
        description: "Anytime: Accessible on desktop, tablet, or mobile – fun knows no bounds.",
        iconUrl: logoClear,
    },
    {
        id: 'community',
        title: '🤝 Community',
        description: "Connect, collaborate, and be inspired by like-minded creators.",
        iconUrl: logoClear,
    },
    {
        id: 'start',
        title: '🚀 Lets get started',
        description: `Join "Music from Nothing" today and let the music begin!`,
        iconUrl: logoClear,
    },
];



const WelcomePageText = props => {
    const { t } = useTranslation("pages");

    return (
        <Stack  
            sx={{ 
                height: { xs: 'fit-content', md: 'calc(100vh - 100px)' }, 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                flexDirection: { sm: 'column', lg: 'row' },
                py: 5,
                scrollSnapAlign: 'start',
            }}
        >
            <Stack sx={{ p: {sm: 5, md: 0}, mb: 4 }} spacing={5}>
                <Typography variant="h3" textAlign="center">
                    {t('welcome.text')}
                </Typography>
                <Typography textAlign="center">
                    Compose, arrange, and produce your unique tunes effortlessly with our innovative web app. Whether you're a seasoned musician or a curious beginner, break barriers and unleash your creativity in a limitless musical playground.
                </Typography>
            </Stack>
            <Stack
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }}  
                flexWrap="wrap"
                spacing={3}
                direction="row"
                useFlexGap
            >
                {
                    cardsData.map((item, key) => {
                        return (
                            <WelcomePageCard item={item} key={key}/>
                        );
                    })
                }
            </Stack>
        </Stack>
    );
}

export default WelcomePageText;