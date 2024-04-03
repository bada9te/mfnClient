/* eslint-disable */
import { Grid, Paper } from "@mui/material"

export default function BaseContentContainer(props: {
    left?: React.ReactNode;
    right?: React.ReactNode;
    children: React.ReactNode;
}) {
    const {left, right} = props;

    return (
            <Grid container component="main" sx={{ 
                height: 'calc(100vh - 110px)', 
                position: 'relative', 
                overflow: 'auto',
            }}>
                <Grid item xs={0} sm={0} md={3} lg={2.5} xl={2}>
                    {left}
                </Grid>
                <Grid
                    sx={{mb: { xs: 0, md: 2 }, mt: { xs: 0, md: 0.8 }, borderRadius: { xs: 0, md: 5 }, overflow: 'hidden', background: 'rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(5px)', color: 'white'}}
                    xs={12} 
                    sm={12} 
                    md={6} 
                    lg={7}
                    xl={8}
                    component={Paper} 
                    elevation={6} 
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