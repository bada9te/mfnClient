
import { Stack, Typography } from "@mui/material";
import logoClear from "../../../images/icons/logo_clear.png"
import WelcomePageCard from "./card/card";

const cardsData = [
    {
        title: 'Listening to music',
        description: 'Listen to music and have fun!',
        iconUrl: logoClear
    },
    {
        title: 'Musical creations sharing',
        description: 'Share users tracks inside the platform.',
        iconUrl: logoClear
    },
    {
        title: "Musician's profiling",
        description: 'The platform provides amazing user profiles which you can customize to your own likes :)',
        iconUrl: logoClear
    },
    {
        title: 'Just for entertaiment and self-study \\*_*/',
        description: 'This platform was developed by a single person and actually in development.',
        iconUrl: logoClear
    },
    {
        title: 'About the author',
        description: 'Hi there! I am so happy to see u on my first huge web-project. I am a casual 3rd year student of National University "Zaporizhzhia Polytechnic", Zaporizhzhia, Ukraine. There is no modern web-development classes in my uni however, so I decided to do some self-education stuff.',
        iconUrl: logoClear,
        github: 'https://github.com/bada9te',
        instagram: 'NULL',
    },
];

const WelcomePageCards = props => {
    return (
        <Stack 
            spacing={10} 
            sx={{ 
                minHeight: 'calc(100vh - 50px)', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                flexDirection: 'column' ,
                my: 5,
                py: 5
            }}
        >
            <Typography variant="h3" textAlign="center">Purpose of the platform and author information</Typography>
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

export default WelcomePageCards;