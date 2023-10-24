import { Grid, Paper } from "@mui/material"

const BaseContentContainer = props => {

    const {left, right} = props;

    return (
        <Grid container component="main" sx={{height: 'calc(100vh - 120px)'}}>
            <Grid item xs={0} sm={3} md={1.95}>
                {left}
            </Grid>
            <Grid 
                xs={12} 
                sm={6} 
                md={8.1} 
                component={Paper} 
                elevation={2} 
                square 
                item
            >
                {props.children}
            </Grid>
            <Grid item xs={0} sm={3} md={1.95}>
                {right}
            </Grid>
        </Grid>
    );
}

export default BaseContentContainer;