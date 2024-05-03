import { Box, Paper, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import React from "react";

export default function ImageRightFormContainer(props: {
    bg: string;
    text: string;
    children: React.ReactNode
}) {
    const { bg, text } = props;

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', m: 2 }}>
            <Grid container component="main" sx={{ minHeight: '100vh', position: 'relative' }}>
                <Grid 
                    item 
                    xs={12} 
                    sm={12} 
                    md={12} 
                    lg={7}
                    xl={5}
                    component={Paper} 
                    elevation={6} 
                    square 
                    sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'none', color: 'white', boxShadow: 0, pt: '65px', pb: '160px' }}
                >
                    {props.children}
                </Grid>

                <Grid
                    item
                    xs={false}
                    sm={false}
                    md={false}
                    lg={5}
                    xl={7}
                    sx={{
                        boxShadow: 5,
                        backgroundImage: `url(${bg})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'right',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '24px',
                    }}
                >
                    <Box sx={{ display: {xs: 'none', md: 'flex'} }}>
                        <Typography sx={{
                            color: 'white',
                            fontSize: {xl: '8vh', lg: '4vw', md: 0},
                            textAlign: 'center'
                        }}>
                            {text}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
