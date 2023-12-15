import { Paper} from "@mui/material"
import Footer from "../../components/common/footer/footer";
import WelcomePageCards from "../../components/common/welcome-page-cards/welcome-page-cards";
import WelcomePageText from "../../components/common/welcome-page-text/welcome-page-text";
import WelcomePageStart from "../../components/common/welcome-page-start/welcome-page-start";
import WelcomePageBestTrackContainer from "../../components/containers/welcome-page-best-track-container/welcome-page-best-track-container";


const Welcome = (props) => {
    
    return (
        <Paper>
            <WelcomePageStart/>

            <WelcomePageText/>
            
            <WelcomePageBestTrackContainer/>

            <WelcomePageCards/>

            <Footer/>
        </Paper>
    );
}


export default Welcome;