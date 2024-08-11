"use client"
import Link from "next/link";


export default function BarTabsBattles(props: {
    activeTab: "in-progress" | "finished" | "create";
}) {
    const { activeTab } = props;

    return (
        <div role="tablist" className="tabs tabs-boxed w-full bg-base-300 glass m-0 mx-2 mt-4 md:mx-4 md:mt-4 rounded-xl">
            <Link
                href={"/battles/in-progress/1"}
                role="tab" 
                className={`tab ${activeTab === "in-progress" && "glass bg-[#1ba39c] text-white"}`} 
            >In progress</Link>
            <Link
                href={"/battles/finished/1"}
                role="tab" 
                className={`tab ${activeTab === "finished" && "glass bg-[#1ba39c] text-white"}`} 
            >Finished</Link>
            <Link 
                href={"/battles/create"}
                role="tab" 
                className={`tab ${activeTab === "create" && "glass bg-[#1ba39c] text-white"}`} 
            >Create new</Link>
        </div>
    );
}