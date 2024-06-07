/* eslint-disable */
import { useReactiveVar } from "@apollo/client/index.js";
import { Box, Grid, Paper } from "@mui/material"
import BottomBar from "@/components/bars/bottom/bottom-bar/bottom-bar";
import TopBar from "@/components/bars/top/top-bar/top-bar";
import Footer from "@/components/common/footer/footer";
import PageLoader from "@/components/common/page-loader/page-loader";
import { pageLoaderState } from "@/components/common/page-loader/reactive";
import CategoriesLeftbarConatiner from "../categories-leftbar-container/categories-leftbar-container";

export default function BaseContentContainer(props: {
    left?: React.ReactNode;
    right?: React.ReactNode;
    children: React.ReactNode;
    mandatoryScroll?: boolean;
    hideFooter?: boolean;
}) {
    const { mandatoryScroll, hideFooter } = props;
    const { isLoading } = useReactiveVar(pageLoaderState);

    return (
        <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}> 
            <Grid container component="main" sx={{ 
                //width: { xs: '100%', md: '100%', lg: '1200px' },
                height: '100vh', 
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 10
            }}>
                <Grid item
                    sx={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 999, // Ensure it's above other content
                        width: '100%',
                        justifyContent: 'center',
                        backdropFilter: 'blur(5px)',
                        '& > *': { // Apply styles to direct children
                            width: '100%',
                            px: 2, // Add padding to the sides
                        },
                    }}
                    container
                    component="header"
                >
                    <TopBar/>
                </Grid>

                <Grid item
                    lg={0} 
                    xl={2} 
                    sx={{ 
                        display: { xs: 'none', xl: 'flex' }, 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        height: '100%',
                        width: '100%',
                        py: 9,
                    }}
                >
                    <Grid
                        sx={{
                            width: '100%',
                            height: { xs: 'calc(100vh - 140px)', lg: 'calc(100vh - 144.5px)'}, 
                            overflow: 'auto', 
                            background: 'rgba(255,255,255,0.3)',
                            backdropFilter: 'blur(5px)',
                            color: 'white',
                            borderRadius: 5,
                            m: 1.5,
                        }}
                        component={Paper} 
                        elevation={6} 
                        square 
                        item
                    >
                        <CategoriesLeftbarConatiner/>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={8} sx={{
                    height: '100%',
                    width: '100%',
                    py: 9,
                }}>
                    <Grid
                        sx={(() => {
                            const styles = {
                                height: { xs: 'calc(100vh - 140px)', lg: 'calc(100vh - 144.5px)'}, 
                                overflow: 'auto', 
                                background: 'rgba(255,255,255,0.3)',
                                backdropFilter: 'blur(5px)',
                                color: 'white',
                                borderRadius: 5,
                                mx: { xs: 1.5, lg: 0 },
                            }
                            if (mandatoryScroll) {
                                return { 
                                    ...styles,
                                    position: 'relative', 
                                    overflow: 'auto', 
                                    scrollSnapType: 'y mandatory',
                                }
                            } 
                            return styles;
                        })()}
                        component={Paper} 
                        elevation={6} 
                        square 
                        item
                    >
                        {
                            isLoading
                            ?
                            <PageLoader loading={isLoading}/>
                            :
                            <>
                                {props.children}
                                {!hideFooter && <Footer/> }
                            </>
                        }
                    </Grid>
                </Grid>
                
                <Grid item
                    lg={0} 
                    xl={2} 
                    sx={{ 
                        display: { xs: 'none', xl: 'flex' }, 
                        justifyContent: 'center', 
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{
                        height: '100%',
                        width: '100%',
                        p: 2,
                        py: 9,
                    }}>
                        <Box sx={{
                            background: 'rgba(255,255,255,0.3)',
                            backdropFilter: 'blur(5px)', 
                            height: '100%',
                            width: '100%',
                            boxShadow: 10,
                            borderRadius: 5,
                            display: 'flex', justifyContent: 'center', alignItems: 'center'
                        }}>
                            RIGHT
                        </Box>
                    </Box>
                </Grid>

                <Grid
                    sx={{
                        position: 'sticky',
                        bottom: '0',
                        zIndex: 999, // Ensure it's above other content
                        width: '100%',
                        justifyContent: 'center',
                        backdropFilter: 'blur(5px)',
                        '& > *': { // Apply styles to direct children
                            width: '100%',
                            px: 2, // Add padding to the sides
                        },
                    }}
                    container
                    component="footer"
                >
                    <BottomBar/>
                </Grid>
            </Grid>
        </Box>
    );
}
