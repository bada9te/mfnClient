"use client"
import {TPaginationProps} from "@/types/pagination";
import {useNotificationsSuspenseQuery} from "@/utils/graphql-requests/generated/schema";
import InfoImage from "@/components/common/info-image/info-image";
import Notification from "@/components/entities/notification/notification";
import Pagination from "@/components/common/pagination/pagination";

export default function NotificationsContainer(props: TPaginationProps & { checked: boolean, receiverId: string }) {
    const { page, offset, limit, checked, receiverId } = props;

    const { data } = useNotificationsSuspenseQuery({
        variables: {
            checked,
            receiverId: receiverId,
            offset,
            limit
        }
    });

    return (
        <>
            {
                data?.notifications?.notifications?.length
                ?
                <>
                    {
                        data?.notifications.notifications.map((notification, key) => {
                            return (<Notification key={key} />)
                        })
                    }
                    <Pagination page={page} maxPage={Number(data?.notifications.count as number / limit)}/>
                </>
                :
                <InfoImage text={"No notifications yet"} image="/assets/icons/text.png"/>
            }
        </>
    );
}