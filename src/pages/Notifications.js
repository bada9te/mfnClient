import NotificationsContainer from "../components/containers/notifications-container/notifications-container";
import BaseContentContainer from "../components/containers/base-content-container/base-content-container";

const Notifications = props => {
    return (
        <BaseContentContainer>
            <NotificationsContainer/>
        </BaseContentContainer>
    );
}

export default Notifications;