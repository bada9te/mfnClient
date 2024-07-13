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
        <div role="tablist" className="tabs tabs-boxed w-full rounded-none md:rounded-xl bg-base-100 m-0 md:mx-8 md:mt-8">
            <a 
                role="tab" 
                className={`tab ${activeTab === "explore" && "tab-active glass"}`}
                onClick={() => handleNavigate("explore", true)}
            >Explore</a>
            <a 
                role="tab" 
                className={`tab ${activeTab === "my-playlists" && "tab-active glass"}`}
                onClick={() => handleNavigate("my-playlists", true)}
            >My playlists</a>
            <a 
                role="tab" 
                className={`tab ${activeTab === "create" && "tab-active glass"}`} 
                onClick={() => handleNavigate("create")}
            >Create new</a>
        </div>
    );
}