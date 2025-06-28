"use client"

import { getDictionary } from "@/app/translations/dictionaries";
import Link from "next/link";

export default function BarTabsPlaylists(props: {
    activeTab: "explore" | "my-playlists" | "create";
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const { activeTab, dictionary } = props;

    return (
        <div role="tablist" className="tabs tabs-boxed w-full bg-base-300  m-0 mx-2 mt-4 md:mx-4 md:mt-4 rounded-2xl md:rounded-2xl">
            <Link 
                role="tab" 
                className={`tab ${activeTab === "explore" && " bg-[#1ba39c] text-base-content"}`}
                href="/playlists/explore/1"
            >{dictionary?.bars["bar-tabs"]["bar-tabs-playlists"].explore}</Link>
            <Link 
                role="tab" 
                className={`tab ${activeTab === "my-playlists" && " bg-[#1ba39c] text-base-content"}`}
                href="/playlists/my-playlists/1"
            >{dictionary?.bars["bar-tabs"]["bar-tabs-playlists"]["my-playlists"]}</Link>
            <Link 
                role="tab" 
                className={`tab ${activeTab === "create" && " bg-[#1ba39c] text-base-content"}`} 
                href="/playlists/create"
            >{dictionary?.bars["bar-tabs"]["bar-tabs-playlists"]["create-new"]}</Link>
        </div>
    );
}