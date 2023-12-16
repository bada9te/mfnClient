import { Typography, Stack } from "@mui/material";
import logoClear from "../../../images/icons/logo_clear.png"
import WelcomePageCard from "../welcome-page-cards/card/card";

const cardsData = [
    {
        title: '🎵 Create',
        description: "Start from scratch, crafting melodies, harmonies, and rhythms.",
        iconUrl: logoClear,
    },
    {
        title: '🎹 Arrange',
        description: "Easily arrange sections, experiment with transitions, and bring your composition to life.",
        iconUrl: logoClear,
    },
    {
        title: '🔊 Produce',
        description: "Fine-tune every detail, add effects, and explore sonic possibilities.",
        iconUrl: logoClear,
    },
    {
        title: '🌐 Anywhere',
        description: "Anytime: Accessible on desktop, tablet, or mobile – your creativity knows no bounds.",
        iconUrl: logoClear,
    },
    {
        title: '🤝 Community',
        description: "Connect, collaborate, and be inspired by like-minded creators.",
        iconUrl: logoClear,
    },
    {
        title: '🚀 Lets get started',
        description: `Join "Music from Nothing" today and let the music begin!`,
        iconUrl: logoClear,
    },
];



const WelcomePageText = props => {
    return (
        <Stack  
            sx={{ 
                minHeight: '100vh', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                flexDirection: { sm: 'column', lg: 'row' },
                my: 5,
                py: 5
            }}
        >
            <Stack sx={{ m: 5, mx: 10 }} spacing={5}>
                <Typography variant="h3" textAlign="center">
                    Welcome to "Music from Nothing" – where creativity knows no bounds! 🎶
                </Typography>
                <Typography textAlign="center">
                    Compose, arrange, and produce your unique tunes effortlessly with our innovative web app. Whether you're a seasoned musician or a curious beginner, break barriers and unleash your creativity in a limitless musical playground.
                </Typography>
            </Stack>
            <Stack
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
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