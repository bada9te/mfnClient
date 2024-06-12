"use client"
import { useRouter } from "next/navigation";

export default function BarTabsBattles(props: {
    activeTab: "in-progress" | "finished" | "create";
}) {
    const { activeTab } = props;

    const router = useRouter();

    const handleNavigate = (a: typeof activeTab) => {
        router.replace(`/battles/${a}`);
    };


    return (
        <div role="tablist" className="tabs tabs-boxed w-full">
            <a 
                role="tab" 
                className={`tab ${activeTab === "in-progress" && "tab-active"}`} 
                onClick={() => handleNavigate("in-progress")}
            >In progress</a>
            <a 
                role="tab" 
                className={`tab ${activeTab === "finished" && "tab-active"}`} 
                onClick={() => handleNavigate("finished")}
            >Finished</a>
            <a 
                role="tab" 
                className={`tab ${activeTab === "create" && "tab-active"}`} 
                onClick={() => handleNavigate("create")}
            >Create new</a>
        </div>
    );
}