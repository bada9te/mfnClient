import { Grid, Paper } from "@mui/material";

const LogRegVerContainer = (props) => {
    const { bg } = props;
    return (
        <Grid container component="main" sx={{  height: '100vh' }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={8}
                sx={{
                    backgroundImage: `url(${bg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square sx={{boxShadow: 20, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {props.children}
            </Grid>
        </Grid>
    );
}

export default LogRegVerContainer;