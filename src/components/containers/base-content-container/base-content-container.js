import { Grid, Paper } from "@mui/material"

const BaseContentContainer = props => {

    const {left, right} = props;

    return (
        <Grid container component="main" sx={{height: 'calc(100vh - 120px)'}}>
            <Grid item xs={0} sm={0} md={3} lg={2.5} xl={2}>
                {left}
            </Grid>
            <Grid 
                xs={12} 
                sm={12} 
                md={6} 
                lg={7}
                xl={8}
                component={Paper} 
                elevation={2} 
                square 
                item
            >
                {props.children}
            </Grid>
            <Grid item xs={0} sm={0} md={3} lg={2.5} xl={2}>
                {right}
            </Grid>
        </Grid>
    );
}

export default BaseContentContainer;