"use client"
import {TPaginationProps} from "@/types/pagination";
import {Notification as TNotification, useNotificationsDeleteByIdsMutation, useNotificationsMarkAsReadByIdsMutation, useNotificationsSuspenseQuery} from "@/utils/graphql-requests/generated/schema";
import InfoImage from "@/components/common/info-image/info-image";
import Notification from "@/components/entities/notification/notification";
import Pagination from "@/components/common/pagination/pagination";
import RefreshButtonPerContainer from "@/components/common/refresh-btn-container/refresh-btn-container";
import { useSnackbar } from "notistack";
import { revalidatePathAction } from "@/actions/revalidation";
import { getDictionary } from "@/dictionaries/dictionaries";

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
                ids: data.notifications.notifications?.map(i => i._id) as string[]
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
                ids: data.notifications.notifications?.map(i => i._id) as string[]
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
                    <button className="btn btn-primary glass text-white" onClick={checked ? handleDeleteNotifications : handleMarkNotificationsAsRead}>
                        {
                            !checked
                            ?
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path
                                        d="M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z"/>
                                    <path
                                        d="m3.265 10.602 7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13 1.37.739a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.71 0l-9.75-5.25a.75.75 0 0 1 0-1.32l1.37-.738Z"/>
                                    <path
                                        d="m10.933 19.231-7.668-4.13-1.37.739a.75.75 0 0 0 0 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 0 0 0-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 0 1-2.134-.001Z"/>
                                </svg>
                                Mark all visible as read
                            </>
                            :
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd"
                                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                            clipRule="evenodd"/>
                                </svg>
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