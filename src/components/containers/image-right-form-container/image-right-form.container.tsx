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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mx: 2, mt: 2, borderRadius: 5 }}>
            <Grid container component="main" sx={{ 
                borderRadius: 5,
                width: '100%',
                height: 'fit-content', 
                minHeight: '700px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 10,
            }}>
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
                    sx={{
                        borderTopLeftRadius: '18px',
                        borderBottomLeftRadius: '18px',
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        color: 'white', 
                        boxShadow: 0, 
                        p: 2,
                        minHeight: '700px',
                        background: 'rgba(255,255,255,0.5)'
                    }}
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
