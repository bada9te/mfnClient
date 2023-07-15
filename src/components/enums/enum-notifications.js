import { useSelector } from "react-redux";
import getTimeSince from "../../common-functions/getTimeSince";
import NotificationItem from "../common/notification-item/notification-item";

const EnumNotifications = props => {
    const notifications = useSelector(state => state.notificationsContainer.notifications);
    const locations = useSelector(state => state.base.locations);

    return (
        <>
            {
                notifications.map((notification, key) => {
                    
                    return (
                        <NotificationItem
                            key={key}
                            id={notification._id}
                            user={[
                                notification.sender._id, 
                                notification.sender.nick, 
                                `${locations?.images}/${notification.sender.avatar}`,
                            ]}
                            text={notification.text}
                            comment={notification.comment}
                            post={notification.post}
                            createdAt={getTimeSince(new Date(notification.createdAt)) + ' ago'}
                        />
                    );
                })
            }
        </>
    );
}

export default EnumNotifications;