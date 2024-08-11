"use client"

import Link from "next/link";

export default function BarTabsPlaylists(props: {
    activeTab: "explore" | "my-playlists" | "create";
}) {
    const { activeTab } = props;

    return (
        <div role="tablist" className="tabs tabs-boxed w-full bg-base-300 glass m-0 mx-2 mt-4 md:mx-4 md:mt-4 rounded-2xl md:rounded-2xl">
            <Link 
                role="tab" 
                className={`tab ${activeTab === "explore" && "glass bg-[#1ba39c] text-white"}`}
                href="/playlists/explore/1"
            >Explore</Link>
            <Link 
                role="tab" 
                className={`tab ${activeTab === "my-playlists" && "glass bg-[#1ba39c] text-white"}`}
                href="/playlists/my-playlists/1"
            >My playlists</Link>
            <Link 
                role="tab" 
                className={`tab ${activeTab === "create" && "glass bg-[#1ba39c] text-white"}`} 
                href="/playlists/create"
            >Create new</Link>
        </div>
    );
}