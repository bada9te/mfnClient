import { Stack, Typography } from "@mui/material";
import logoClear from "../../../assets/icons/logo_clear.png"
import WelcomePageCard from "../welcome-card/welcome-card";
import { useTranslation } from "react-i18next";

const cardsData = [
    {
        id: "listening",
        title: 'Listening to music',
        description: 'Listen to music and have fun!',
        iconUrl: logoClear
    },
    {
        id: "musical",
        title: 'Musical creations sharing',
        description: 'Share users tracks inside the platform.',
        iconUrl: logoClear
    },
    {
        id: "musician",
        title: "Musician's profiling",
        description: 'The platform provides amazing user profiles which you can customize to your own likes :)',
        iconUrl: logoClear
    },
    {
        id: "just",
        title: 'Just for entertaiment and self-study \\*_*/',
        description: 'This platform was developed by a single person and actually in development.',
        iconUrl: logoClear
    },
    {
        id: "about",
        title: 'About the author',
        description: 'Hi there! I am so happy to see u on my first huge web-project. I am a casual 3rd year student of National University "Zaporizhzhia Polytechnic", Zaporizhzhia, Ukraine. There is no modern web-development classes in my uni however, so I decided to do some self-education stuff.',
        iconUrl: logoClear,
        github: [{ bada9te: 'https://github.com/bada9te' }],
        instagram: [{ bada9te: 'NULL' }],
    },
    {
        id: "gratitude",
        title: 'Big gratitude',
        iconUrl: logoClear,
        description: "Want to say great thanks for translation to Deutch (Name Surname) and some technical stuff (Name Surname)",
        github: [],
        instagram: [],
    }
];

const WelcomePageCards = props => {
    const { t } = useTranslation("pages");

    return (
        <Stack 
            spacing={10} 
            sx={{ 
                minHeight: 'calc(100vh - 120px)', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                flexDirection: 'column' ,
                scrollSnapAlign: 'start',
                py: 10,
            }}
        >
            <Typography variant="h3" textAlign="center">{t('welcome.purpose')}</Typography>
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

export default WelcomePageCards;