import WelcomePageCards from "@/components/welcome-static/welcome-page-cards/welcome-page-cards";
import WelcomePageText from "@/components/welcome-static/welcome-page-text/welcome-page-text";
import WelcomePageStart from "@/components/welcome-static/welcome-page-start/welcome-page-start";
import WelcomePageBestTrackContainer from "@/components/containers/welcome-page-best-track-container/welcome-page-best-track-container";
import BaseContentContainer from "@/components/containers/base-content-container/base-content-container";


export default function Welcome() {
    return (
        <BaseContentContainer mandatoryScroll>
            <WelcomePageStart/>

            <WelcomePageText/>
            
            <WelcomePageBestTrackContainer/>

            <WelcomePageCards/>
        </BaseContentContainer>
    );
}