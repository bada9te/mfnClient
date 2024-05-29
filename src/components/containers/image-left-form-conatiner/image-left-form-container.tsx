import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";

export default function LogRegVerContainer(props: {
    bg: string;
    text: string;
    children: React.ReactNode
}) {
    const { bg, text } = props;
    return (
        <Box sx={{  display: 'flex', justifyContent: 'center', alignItems: 'center', mx: 2, mt: 2, borderRadius: 5 }}>
            <Grid container component="main" sx={{ 
                borderRadius: 5,
                width: '100%',
                height: 'fit-content', 
                minHeight: '700px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 10
            }}>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={8}
                    component={Paper}
                    sx={{
                        boxShadow: 0,
                        backgroundImage: `url(${bg})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'left',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <Box sx={{ display: {xs: 'none', sm: 'flex'}, justifyContent: 'center', width: '100%'}} >
                        <Typography sx={{
                            color: 'white',
                            fontSize: {xl: '8vh', lg: '6vw', md: '5vw', sm: '4vw'},
                            textAlign: 'center'
                        }}>
                            {text}
                        </Typography>
                    </Box>
                </Grid>

                <Grid 
                    item 
                    xs={12} 
                    sm={8} 
                    md={4} 
                    component={Paper} 
                    elevation={6} 
                    square 
                    sx={{
                        borderTopRightRadius: '18px',
                        borderBottomRightRadius: '18px',
                        boxShadow: 20, 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflowY: 'auto', 
                        height: '100%',
                        minHeight: '700px',
                        color: 'white',
                        background: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(5px)'
                    }}
                >
                    {props.children}
                </Grid>
            </Grid>
        </Box>
    );
}