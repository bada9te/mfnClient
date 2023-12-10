import { Box, Container, Paper, Typography } from "@mui/material"
import TopBar from "../../components/bars/top/top-bar/top-bar";
import Footer from "../../components/common/footer/footer";
import WelcomePageScroller from "../../components/common/welcome-page-scroller/welcome-page-scroller";

const Welcome = (props) => {
    
    return (
        <Paper>
            <TopBar/>
            <Box sx={{mt: 8}}>
                <WelcomePageScroller/>
                
                <Box sx={{ height: "75vh", backgroundColor: 'red' }}>
                    
                </Box>
                <Box sx={{ height: "75vh", backgroundColor: 'yellow' }}>
                    
                </Box>
            </Box>
            <Footer/>
        </Paper>
    );
}


export default Welcome;