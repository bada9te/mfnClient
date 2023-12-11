import { Box, Paper} from "@mui/material"
import Footer from "../../components/common/footer/footer";
import WelcomePageScroller from "../../components/common/welcome-page-scroller/welcome-page-scroller";
import WelcomePageStart from "../../components/common/welcome-page-start/welcome-page-start";
import WelcomePageBestTrackContainer from "../../components/containers/welcome-page-best-track-container/welcome-page-best-track-container";


const Welcome = (props) => {
    
    return (
        <Paper>
            <Box>
                <WelcomePageStart/>

                <WelcomePageScroller/>
                
                <WelcomePageBestTrackContainer/>

                <Box sx={{ height: "75vh", backgroundColor: 'yellow' }}>
                    
                </Box>
            </Box>
            <Footer/>
        </Paper>
    );
}


export default Welcome;