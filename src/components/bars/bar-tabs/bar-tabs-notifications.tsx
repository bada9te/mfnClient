"use client"
import { getDictionary } from "@/dictionaries/dictionaries";
import Link from "next/link";


export default function NotificationsTabsBattles(props: {
    activeTab: "new" | "read";
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const { activeTab , dictionary} = props;

    return (
        <div role="tablist" className="tabs tabs-boxed w-full bg-base-300 glass m-0 mx-2 mt-4 md:mx-4 md:mt-4 rounded-2xl md:rounded-2xl">
            <Link 
                role="tab" 
                className={`tab ${activeTab === "new" && "glass bg-[#1ba39c] text-white"}`}
                href={"/profile/me/notifications/new/1"}
            >{dictionary?.bars["bar-tabs"]["bar-tabs-notifications"].new}</Link>
            <Link 
                role="tab" 
                className={`tab ${activeTab === "read" && "glass bg-[#1ba39c] text-white"}`}
                href={"/profile/me/notifications/read/1"}
            >{dictionary?.bars["bar-tabs"]["bar-tabs-notifications"].reviewed}</Link>
        </div>
    );
}