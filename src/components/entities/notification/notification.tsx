import { revalidatePathAction } from "@/actions/revalidation";
import { getDictionary } from "@/dictionaries/dictionaries";
import getTimeSince from "@/utils/common-functions/getTimeSince";
import { Notification as TNotification, useNotificationDeleteByIdMutation, useNotificationMarkAsReadByIdMutation } from "@/utils/graphql-requests/generated/schema";
import { BookOpenCheck, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSnackbar } from "notistack";

const LinkButton = ({text, url}: {text: string, url: string}) => {
    return (<Link href={url} className="bg-[#1c94a5] glass text-white px-1 shadow-md hover:bg-[#1c95a58e] font-semibold">{text}</Link>);
}

export default function Notification({data, dictionary}: {data: TNotification; dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]}) {
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
                                            {dictionary.entities.notification["new-post"]["part-1"]}
                                            <LinkButton url={`/profile/${data?.sender?._id}/1`} text={`@${data?.sender?.nick}`} />
                                            {dictionary.entities.notification["new-post"]["part-2"]}
                                            <LinkButton url={`/post/${data.post?._id}/${data?.sender?._id}`} text={`@post - ${data.post?.title}`} />
                                        </>
                                    );
                                case "POST_REPORTED":
                                    return (
                                        <>
                                            {dictionary.entities.notification["post-reported"]["part-1"]}
                                            <LinkButton url={`/post/${data.post?._id}/${data.receiver?._id}`} text={`@post - ${data.post?.title}`} />
                                            {dictionary.entities.notification["post-reported"]["part-2"]}
                                            {/* @ts-ignore */}
                                            <span className="font-semibold text-red-400"> {dictionary.modals.report.cards[data.text]?.title ? dictionary.modals.report.cards[data.text]?.title : "---"}</span>
                                        </>
                                    );
                                case "BATTLE_FINISHED":
                                    return (
                                        <>
                                            {dictionary.entities.notification["battle-finished"]["part-1"]}
                                            <LinkButton url={`/battles/${data.battle?._id}`} text={`@${data.battle?.title}`} />
                                            {dictionary.entities.notification["battle-finished"]["part-2"]}
                                        </>
                                    ); 
                                case "BATTLE_CREATED":
                                    return (
                                        <>
                                            {dictionary.entities.notification["battle-created"]["part-1"]}
                                            <LinkButton url={`/battles/${data.battle?._id}`} text={`@${data.battle?.title}`} />
                                            {dictionary.entities.notification["battle-created"]["part-2"]}
                                        </>
                                    );
                                case "SUBSCRIBED": 
                                    return (
                                        <>
                                            {dictionary.entities.notification.subscribed["part-1"]}
                                            <LinkButton url={`/profile/${data?.sender?._id}/1`} text={`@${data?.sender?.nick}`} />
                                            {dictionary.entities.notification.subscribed["part-2"]}
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
                            <Trash2 />
                            {dictionary.entities.notification.delete}
                        </button>
                        {
                            !data.checked && 
                            <button className="btn btn-primary btn-sm glass text-white join-item w-full" onClick={handleMarkAsRead}>
                                <BookOpenCheck />
                                {dictionary.entities.notification["mark-as-read"]}
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}