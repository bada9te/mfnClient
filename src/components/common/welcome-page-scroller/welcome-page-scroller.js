import { Box, Paper, MobileStepper, Button, Typography, Card, CardActionArea, CardMedia, CardContent } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useState } from "react";
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
    {
      label: 'San Francisco',
      imgPath:
        'https://i.redd.it/nhk8jg3psng71.jpg',
    },
    {
      label: 'Bird',
      imgPath:
        'https://co10.nevseoboi.com.ua/posts/2011-09/1316735818_2_www.nevseoboi.com.ua.jpg',
    },
    {
        label: 'View label',
        imgPath:
            'https://cdn.wallpapersafari.com/73/7/SB30Pn.jpg'
    }
];



const WelcomePageScroller = props => {
    const [ activeStep, setActiveStep ] = useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <Box sx={{ maxWidth: '100%', flexGrow: 1 }}>
            <AutoPlaySwipeableViews
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {images.map((step, index) => (
                    <Card sx={{ maxWidth: '100%' }} key={index}>
                        <CardActionArea>
                        <CardMedia
                            component="img"
                            sx={{
                                aspectRatio: '21/7',
                            }}
                            image={step.imgPath}
                            alt="green iguana"
                        />
                        <CardContent 
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems:'center', 
                                flexWrap: 'wrap', 
                                flexDirection: 'column',
                                bgcolor: 'rgba(0,0,0,0.3)',
                                backdropFilter: 'blur(5px)',
                                width: '100%',
                            }}>
                            <Typography gutterBottom variant="h1" component="div" sx={{ color: 'white' }}>
                                {images[activeStep].label}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ color: 'white' }}>
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </AutoPlaySwipeableViews>

            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                >
                    Next
                    <KeyboardArrowRight />
                </Button>
                }
                backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    <KeyboardArrowLeft />
                    Back
                </Button>
                }
            />
        </Box>
    );
}

export default WelcomePageScroller;