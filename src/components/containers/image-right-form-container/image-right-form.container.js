import { Paper } from "@mui/material";
import { Grid } from "@mui/material";

const ImageRightFormContainer = (props) => {
    const { bg } = props;

    return (
        <Grid container component="main" sx={{  height: '100vh' }}>
            <Grid 
                item 
                xs={12} 
                sm={8} 
                md={4} 
                component={Paper} 
                elevation={2} 
                square 
                sx={{boxShadow: 20, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            >
                {props.children}
            </Grid>

            <Grid
                item
                xs={false}
                sm={4}
                md={8}
                sx={{
                    boxShadow: 20,
                    backgroundImage: `url(${bg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
        </Grid>
    );
}


export default ImageRightFormContainer;