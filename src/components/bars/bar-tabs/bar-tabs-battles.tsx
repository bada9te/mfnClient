"use client"
import { useRouter } from "next/navigation";

export default function BarTabsBattles(props: {
    activeTab: "in-progress" | "finished" | "create";
}) {
    const { activeTab } = props;

    const router = useRouter();

    const handleNavigate = (a: typeof activeTab, counterPage?: boolean) => {
        router.replace(`/battles/${a}${counterPage ? '/1' : ''}`);
    };


    return (
        <div role="tablist" className="tabs tabs-boxed w-full rounded-none bg-black glass m-0 md:mx-8 md:mt-8">
            <a 
                role="tab" 
                className={`tab ${activeTab === "in-progress" && "glass bg-[#1ba39c]"}`} 
                onClick={() => handleNavigate("in-progress", true)}
            >In progress</a>
            <a 
                role="tab" 
                className={`tab ${activeTab === "finished" && "glass bg-[#1ba39c]"}`} 
                onClick={() => handleNavigate("finished", true)}
            >Finished</a>
            <a 
                role="tab" 
                className={`tab ${activeTab === "create" && "glass bg-[#1ba39c]"}`} 
                onClick={() => handleNavigate("create")}
            >Create new</a>
        </div>
    );
}