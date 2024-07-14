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
        <div role="tablist" className="tabs tabs-boxed w-full rounded-none md:rounded-xl bg-black glass m-0 md:mx-8 md:mt-8">
            <a 
                role="tab" 
                className={`tab ${activeTab === "explore" && "glass bg-[#1ba39c]"}`}
                onClick={() => handleNavigate("explore", true)}
            >Explore</a>
            <a 
                role="tab" 
                className={`tab ${activeTab === "my-playlists" && "glass bg-[#1ba39c]"}`}
                onClick={() => handleNavigate("my-playlists", true)}
            >My playlists</a>
            <a 
                role="tab" 
                className={`tab ${activeTab === "create" && "glass bg-[#1ba39c]"}`} 
                onClick={() => handleNavigate("create")}
            >Create new</a>
        </div>
    );
}