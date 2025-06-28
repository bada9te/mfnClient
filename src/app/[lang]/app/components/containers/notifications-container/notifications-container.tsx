"use client"
import {TPaginationProps} from "@/app/types/pagination";
import {Notification as TNotification, useNotificationsDeleteByIdsMutation, useNotificationsMarkAsReadByIdsMutation, useNotificationsSuspenseQuery} from "@/app/utils/graphql-requests/generated/schema";
import InfoImage from "@/app/[lang]/app/components/common/info-image/info-image";
import Notification from "../../entities/notification/notification";
import Pagination from "@/app/[lang]/app/components/common/pagination/pagination";
import RefreshButtonPerContainer from "@/app/[lang]/app/components/common/refresh-btn-container/refresh-btn-container";
import { useSnackbar } from "notistack";
import { revalidatePathAction } from "@/app/utils/actions/revalidation";
import { getDictionary } from "@/app/translations/dictionaries";
import { Book, Recycle } from "lucide-react";

export default function NotificationsContainer(props: TPaginationProps & { checked: boolean, receiverId: string; dictionary: Awaited<ReturnType<typeof getDictionary>>["components"] }) {
    const { page, offset, limit, checked, receiverId, dictionary } = props;
    const { enqueueSnackbar } = useSnackbar();

    const { data, refetch } = useNotificationsSuspenseQuery({
        variables: {
            checked,
            receiverId: receiverId,
            offset,
            limit
        }
    });

    const [ deleteVisibleNotifications ] = useNotificationsDeleteByIdsMutation();
    const handleDeleteNotifications = () => {
        enqueueSnackbar("Deleting...", {autoHideDuration: 1500});
        deleteVisibleNotifications({
            variables: {
                ids: data?.notifications.notifications?.map(i => i._id) as string[]
            }
        }).then(_ => {
            enqueueSnackbar("Visible notifications deleted", {autoHideDuration: 2000, variant: 'success'});
            revalidatePathAction("/profile/me/notifications/new/1", "page");
            revalidatePathAction("/profile/me/notifications/read/1", "page");
        }).catch(_ => {
            enqueueSnackbar("Sth went wrong, pls try again later", {autoHideDuration: 4000, variant: 'error'});
        });
    }

    const [ markVisibleNotificationsAsRead ] = useNotificationsMarkAsReadByIdsMutation();
    const handleMarkNotificationsAsRead = () => {
        enqueueSnackbar("Processing...", {autoHideDuration: 1500});
        markVisibleNotificationsAsRead({
            variables: {
                ids: data?.notifications.notifications?.map(i => i._id) as string[]
            }
        }).then(_ => {
            enqueueSnackbar("Visible notifications marked as read", {autoHideDuration: 2000, variant: 'success'});
            revalidatePathAction("/profile/me/notifications/new/1", "page");
            revalidatePathAction("/profile/me/notifications/read/1", "page");
        }).catch(_ => {
            enqueueSnackbar("Sth went wrong, pls try again later", {autoHideDuration: 4000, variant: 'error'});
        });
    }


    return (
        <>
            <RefreshButtonPerContainer handleClick={() => refetch({
                checked,
                receiverId: receiverId,
                offset,
                limit,
            })} dictionary={dictionary}/>
            {
                data?.notifications?.notifications?.length
                ?
                <>
                    <button className="btn btn-sm text-base-content" onClick={checked ? handleDeleteNotifications : handleMarkNotificationsAsRead}>
                        {
                            !checked
                            ?
                            <>
                                <Book/>
                                Mark all visible as read
                            </>
                            :
                            <>
                                <Recycle/>
                                Delete all visible
                            </>
                        }
                    </button>
                    {
                        data?.notifications.notifications.map((notification, key) => {
                            return (<Notification key={key} data={notification as TNotification} dictionary={dictionary}/>)
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