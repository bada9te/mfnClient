import { revalidatePathAction } from "@/actions/revalidation";
import getTimeSince from "@/utils/common-functions/getTimeSince";
import { Notification as TNotification, useNotificationDeleteByIdMutation, useNotificationMarkAsReadByIdMutation } from "@/utils/graphql-requests/generated/schema";
import Link from "next/link";
import { useSnackbar } from "notistack";

const LinkButton = ({text, url}: {text: string, url: string}) => {
    return (<Link href={url} className="bg-[#1c94a5] glass text-white px-1 shadow-md hover:bg-[#1c95a58e] font-semibold">{text}</Link>);
}

export default function Notification({data}: {data: TNotification}) {
    const {enqueueSnackbar} = useSnackbar();
    const [ deleteNotification ] = useNotificationDeleteByIdMutation();
    const [ markNotificationAsRead ] = useNotificationMarkAsReadByIdMutation();

    const handleDelete = () => {
        enqueueSnackbar("Deleting...", {autoHideDuration: 1500});
        deleteNotification({
            variables: {
                _id: data._id
            }
        }).then(_ => {
            enqueueSnackbar("Removed", {autoHideDuration: 2500, variant: 'success'});
            revalidatePathAction("/profile/me/notifications/new/1", "page");
            revalidatePathAction("/profile/me/notifications/read/1", "page");
        }).catch(_ => {
            enqueueSnackbar("Sth went wrong, pls try again later", {autoHideDuration: 3000, variant: 'error'});
        });
    }

    const handleMarkAsRead = () => {
        enqueueSnackbar("Processing...", {autoHideDuration: 1500});
        markNotificationAsRead({
            variables: {
                _id: data._id
            }
        }).then(_ => {
            enqueueSnackbar("Marked as read", {autoHideDuration: 2500, variant: 'success'});
            revalidatePathAction("/profile/me/notifications/new/1", "page");
            revalidatePathAction("/profile/me/notifications/read/1", "page");
        }).catch(_ => {
            enqueueSnackbar("Sth went wrong, pls try again later", {autoHideDuration: 3000, variant: 'error'});
        });
    }


    return (
        <div className="card bg-base-300 shadow-xl w-full text-start glass">
            <div className="card-body relative">
                <p className="absolute top-4 right-5">{getTimeSince(new Date(+data.createdAt))} ago</p>
                <h2 className="card-title">
                    {
                        (() => {
                            // "SUBSCRIBED" | "BATTLE_CREATED" | "BATTLE_FINISHED" | "POST_REPORTED" | "POST_CREATED"
                            switch (data.type) {
                                case "SUBSCRIBED": return "🤗 New subscriber";
                                case "BATTLE_CREATED": return "⚔ New battle";
                                case "BATTLE_FINISHED": return "⚔ Battle finished";
                                case "POST_REPORTED": return "💀 Bad news";
                                case "POST_CREATED": return "🎼 New hit!";
                                case "SYSTEM": return "🤖 System message";
                                default: return "💣 Unknown"
                            }
                        })()
                    }
                </h2>
                <div className="py-2">
                    {
                        (() => {
                            switch (data.type) {
                                case "SYSTEM": 
                                    return data.text;
                                case "POST_CREATED":
                                    return (
                                        <>
                                            {data.text.substring(0, data.text.indexOf('{user}'))}
                                            <LinkButton url={`/profile/${data?.sender?._id}/1`} text={`@${data?.sender?.nick}`} />
                                            {data.text.substring(data.text.indexOf('{user}') + '{user}'.length, data.text.indexOf('{post}'))}
                                            <LinkButton url={`/post/${data.post?._id}/${data?.sender?._id}`} text={`@post - ${data.post?.title}`} />
                                        </>
                                    );
                                case "POST_REPORTED":
                                    return (
                                        <>
                                            {data.text.substring(0, data.text.indexOf('{post}'))}
                                            <LinkButton url={`/post/${data.post?._id}/${data.receiver._id}`} text={`@post - ${data.post?.title}`} />
                                            {data.text.substring(data.text.indexOf('{post}') + '{post}'.length, data.text.indexOf('"'))}
                                            <span className="font-semibold">{data.text.substring(data.text.indexOf('"') - 1, data.text.length)}</span>
                                        </>
                                    );
                                case "BATTLE_FINISHED":
                                    return (
                                        <>
                                            {data.text.substring(0, data.text.indexOf('{battle}'))}
                                            <LinkButton url={`/battles/${data.battle?._id}`} text={`@${data.battle?.title}`} />
                                            {data.text.substring(data.text.indexOf('{battle}') + '{battle}'.length, data.text.length)}
                                        </>
                                    ); 
                                case "BATTLE_CREATED":
                                    return (
                                        <>
                                            {data.text.substring(0, data.text.indexOf('{battle}'))}
                                            <LinkButton url={`/battles/${data.battle?._id}`} text={`@${data.battle?.title}`} />
                                            {data.text.substring(data.text.indexOf('{battle}') + '{battle}'.length, data.text.length)}
                                        </>
                                    );
                                case "SUBSCRIBED": 
                                    return (
                                        <>
                                            {data.text.substring(0, data.text.indexOf('{user}'))}
                                            <LinkButton url={`/profile/${data?.sender?._id}/1`} text={`@${data?.sender?.nick}`} />
                                            {data.text.substring(data.text.indexOf('{user}') + '{user}'.length, data.text.length)}
                                        </>
                                    );
                                default:
                                    break;
                            }
                        })()
                    }
                    
                </div>
                <div className="card-actions">
                    <div className="join join-vertical md:join-horizontal w-full md:w-fit">
                        <button className="btn btn-error join-item btn-sm glass text-white w-full" onClick={handleDelete}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="size-6">
                                <path fillRule="evenodd"
                                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                      clipRule="evenodd"/>
                            </svg>
                            Delete
                        </button>
                        {
                            !data.checked && 
                            <button className="btn btn-primary btn-sm glass text-white join-item w-full" onClick={handleMarkAsRead}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    className="size-6">
                                    <path
                                        d="M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z"/>
                                    <path
                                        d="m3.265 10.602 7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13 1.37.739a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.71 0l-9.75-5.25a.75.75 0 0 1 0-1.32l1.37-.738Z"/>
                                    <path
                                        d="m10.933 19.231-7.668-4.13-1.37.739a.75.75 0 0 0 0 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 0 0 0-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 0 1-2.134-.001Z"/>
                                </svg>
                                Mark as read
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}