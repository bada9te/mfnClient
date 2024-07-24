"use client"
import Link from "next/link";


export default function BarTabsBattles(props: {
    activeTab: "in-progress" | "finished" | "create";
}) {
    const { activeTab } = props;

    return (
        <div role="tablist" className="tabs tabs-boxed w-full rounded-none bg-black glass m-0 md:mx-8 md:mt-8">
            <Link
                href={"/battles/in-progress/1"}
                role="tab" 
                className={`tab ${activeTab === "in-progress" && "glass bg-[#1ba39c]"}`} 
            >In progress</Link>
            <Link
                href={"/battles/finished/1"}
                role="tab" 
                className={`tab ${activeTab === "finished" && "glass bg-[#1ba39c]"}`} 
            >Finished</Link>
            <Link 
                href={"/battles/create"}
                role="tab" 
                className={`tab ${activeTab === "create" && "glass bg-[#1ba39c]"}`} 
            >Create new</Link>
        </div>
    );
}