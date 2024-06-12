"use client"
import { useRouter } from "next/navigation";

export default function BarTabsPlaylists(props: {
    activeTab: "explore" | "my-playlists" | "create";
}) {
    const { activeTab } = props;

    const router = useRouter();

    const handleNavigate = (a: typeof activeTab, counterPage?: boolean) => {
        router.replace(`/playlists/${a}${counterPage ? '/1' : ''}`);
    };


    return (
        <div role="tablist" className="tabs tabs-boxed w-full">
            <a 
                role="tab" 
                className={`tab ${activeTab === "explore" && "tab-active"}`}
                onClick={() => handleNavigate("explore", true)}
            >Explore</a>
            <a 
                role="tab" 
                className={`tab ${activeTab === "my-playlists" && "tab-active"}`}
                onClick={() => handleNavigate("my-playlists", true)}
            >My playlists</a>
            <a 
                role="tab" 
                className={`tab ${activeTab === "create" && "tab-active"}`} 
                onClick={() => handleNavigate("create")}
            >Create new</a>
        </div>
    );
}