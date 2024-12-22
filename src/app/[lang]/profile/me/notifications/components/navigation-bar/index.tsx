"use client"
import { getDictionary } from "@/app/dictionaries/dictionaries";
import Link from "next/link";


export default function BarTabsNotifications(props: {
    activeTab: "new" | "read";
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const { activeTab , dictionary} = props;

    return (
        <div role="tablist" className="tabs tabs-boxed w-full bg-base-300  m-0 mx-2 mt-4 md:mx-4 md:mt-4 rounded-2xl md:rounded-2xl">
            <Link 
                role="tab" 
                className={`tab ${activeTab === "new" && " bg-[#1ba39c] text-base-content"}`}
                href={"/profile/me/notifications/new/1"}
            >{dictionary?.bars["bar-tabs"]["bar-tabs-notifications"].new}</Link>
            <Link 
                role="tab" 
                className={`tab ${activeTab === "read" && " bg-[#1ba39c] text-base-content"}`}
                href={"/profile/me/notifications/read/1"}
            >{dictionary?.bars["bar-tabs"]["bar-tabs-notifications"].reviewed}</Link>
        </div>
    );
}