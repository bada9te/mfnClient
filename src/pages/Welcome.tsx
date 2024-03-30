import { Paper} from "@mui/material"
import Footer from "../components/common/footer/footer";
import WelcomePageCards from "../components/welcome-static/welcome-page-cards/welcome-page-cards";
import WelcomePageText from "../components/welcome-static/welcome-page-text/welcome-page-text";
import WelcomePageStart from "../components/welcome-static/welcome-page-start/welcome-page-start";
import WelcomePageBestTrackContainer from "../components/containers/welcome-page-best-track-container/welcome-page-best-track-container";


export default function Welcome() {
    return (
        <Paper sx={{ 
            position: 'relative', 
            height: 'calc(100vh - 120px)', 
            overflow: 'auto', 
            scrollSnapType: 'y mandatory',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(5px)',
            color: 'white',
        }}>
            <WelcomePageStart/>

            <WelcomePageText/>
            
            <WelcomePageBestTrackContainer/>

            <WelcomePageCards/>

            <Footer/>
        </Paper>
    );
}