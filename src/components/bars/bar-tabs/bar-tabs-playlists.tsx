"use client"

import Link from "next/link";

export default function BarTabsPlaylists(props: {
    activeTab: "explore" | "my-playlists" | "create";
}) {
    const { activeTab } = props;

    return (
        <div role="tablist" className="tabs tabs-boxed w-full rounded-none bg-black glass m-0 md:mx-8 md:mt-8">
            <Link 
                role="tab" 
                className={`tab ${activeTab === "explore" && "glass bg-[#1ba39c]"}`}
                href="/playlists/explore/1"
            >Explore</Link>
            <Link 
                role="tab" 
                className={`tab ${activeTab === "my-playlists" && "glass bg-[#1ba39c]"}`}
                href="/playlists/my-playlists/1"
            >My playlists</Link>
            <Link 
                role="tab" 
                className={`tab ${activeTab === "create" && "glass bg-[#1ba39c]"}`} 
                href="/playlists/create"
            >Create new</Link>
        </div>
    );
}