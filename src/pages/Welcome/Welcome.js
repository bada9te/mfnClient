import { Paper} from "@mui/material"
import Footer from "../../components/common/footer/footer";
import WelcomePageCards from "../../components/common/welcome-page-cards/welcome-page-cards";
import WelcomePageScroller from "../../components/common/welcome-page-scroller/welcome-page-scroller";
import WelcomePageStart from "../../components/common/welcome-page-start/welcome-page-start";
import WelcomePageBestTrackContainer from "../../components/containers/welcome-page-best-track-container/welcome-page-best-track-container";


const Welcome = (props) => {
    
    return (
        <Paper>
            <WelcomePageStart/>

            <WelcomePageScroller/>
            
            <WelcomePageBestTrackContainer/>

            <WelcomePageCards/>
            
            <Footer/>
        </Paper>
    );
}


export default Welcome;