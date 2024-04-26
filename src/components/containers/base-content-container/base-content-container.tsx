/* eslint-disable */
import { useReactiveVar } from "@apollo/client";
import { Box, Grid, Paper } from "@mui/material"
import Footer from "components/common/footer/footer";
import PageLoader from "components/common/page-loader/page-loader";
import { pageLoaderState } from "components/common/page-loader/reactive";

export default function BaseContentContainer(props: {
    left?: React.ReactNode;
    right?: React.ReactNode;
    children: React.ReactNode;
    mandatoryScroll?: boolean;
}) {
    const {left, right, mandatoryScroll} = props;
    const { isLoading } = useReactiveVar(pageLoaderState);

    return (
        <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {
                isLoading
                ?
                <PageLoader loading={isLoading}/>
                :
                <Grid container component="main" sx={{ 
                    width: { xs: '100%', md: '100%', lg: '1200px' },
                    height: '100vh', 
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: 10
                }}>
                    <Grid
                        sx={(() => {
                            if (mandatoryScroll) {
                                return { 
                                    position: 'relative', 
                                    height: '100vh', 
                                    overflow: 'auto', 
                                    scrollSnapType: 'y mandatory',
                                    background: 'rgba(255,255,255,0.2)',
                                    backdropFilter: 'blur(5px)',
                                    color: 'white',
                                }
                            } else {
                                return {
                                    overflow: 'hidden', background: 'rgba(255,255,255,0.3)',
                                    backdropFilter: 'blur(5px)', color: 'white', pt: '65px', overflowY: 'auto', height: '100%', pb: '50px', width: '100%',
                                }
                            }
                        })()}
                        xs={12} 
                        sm={12} 
                        md={12} 
                        lg={12}
                        xl={12}
                        component={Paper} 
                        elevation={6} 
                        square 
                        item
                    >
                        {props.children}
                        <Footer/>
                    </Grid>
                </Grid>
            }
        </Box>
    );
}
