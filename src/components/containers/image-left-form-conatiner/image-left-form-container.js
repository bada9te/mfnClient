import { Box, Grid, Paper, Typography } from "@mui/material";

const LogRegVerContainer = (props) => {
    const { bg, text } = props;
    return (
        <Grid container component="main" sx={{  height: '100vh' }}>
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
                        fontSize: {xl: '10vh', lg: '6vw', md: '5vw', sm: '4vw'},
                        textAlign: 'center'
                    }}>
                        {text}
                    </Typography>
                </Box>
            </Grid>

            <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square sx={{boxShadow: 20, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {props.children}
            </Grid>
        </Grid>
    );
}

export default LogRegVerContainer;