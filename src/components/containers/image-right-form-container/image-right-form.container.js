import { Box, Paper, Typography } from "@mui/material";
import { Grid } from "@mui/material";

const ImageRightFormContainer = (props) => {
    const { bg, text } = props;

    return (
        <Grid container component="main" sx={{ height: '100vh', position: 'relative', overflow: 'auto' }}>
            <Grid 
                item 
                xs={12} 
                sm={12} 
                md={12} 
                lg={7}
                xl={5}
                component={Paper} 
                elevation={2} 
                square 
                sx={{boxShadow: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
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
                    boxShadow: 0,
                    backgroundImage: `url(${bg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'right',
                    display: 'flex',
                    alignItems: 'center'
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
    );
}


export default ImageRightFormContainer;