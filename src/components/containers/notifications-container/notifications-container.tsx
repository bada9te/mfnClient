"use client"
import {TPaginationProps} from "@/types/pagination";
import {useNotificationsQuery} from "@/utils/graphql-requests/generated/schema";
import {useAppSelector} from "@/lib/redux/store";
import InfoImage from "@/components/info-image/info-image";
import Notification from "@/components/entities/notification/notification";
import Pagination from "@/components/pagination/pagination";

export default function NotificationsContainer(props: TPaginationProps & { checked: boolean }) {
    const { page, offset, limit, checked } = props;
    const user = useAppSelector(state => state.user.user);

    const { data, loading } = useNotificationsQuery({
        variables: {
            checked,
            receiverId: user._id,
            offset,
            limit
        }
    });

    return (
        <>
            {
                loading
                ?
                <>

                </>
                :
                <>
                    {
                        data?.notifications.notifications?.length
                        ?
                        <>
                            {
                                data?.notifications.notifications?.map((notification, key) => {
                                    return (<Notification key={key} />)
                                })
                            }
                            <Pagination page={page} maxPage={Number(data?.notifications.count as number / limit)}/>
                        </>
                        :
                        <InfoImage text={"No notifications yet"}/>
                    }
                </>
            }
        </>
    );
}