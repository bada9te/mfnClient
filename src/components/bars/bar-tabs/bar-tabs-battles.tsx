"use client"
import Link from "next/link";


export default function BarTabsBattles(props: {
    activeTab: "in-progress" | "finished" | "create";
}) {
    const { activeTab } = props;

    return (
        <div role="tablist" className="tabs tabs-boxed w-full bg-base-300 glass m-0 md:mx-4 md:mt-4">
            <Link
                href={"/battles/in-progress/1"}
                role="tab" 
                className={`tab ${activeTab === "in-progress" && "glass bg-[#bd93f9]"}`} 
            >In progress</Link>
            <Link
                href={"/battles/finished/1"}
                role="tab" 
                className={`tab ${activeTab === "finished" && "glass bg-[#bd93f9]"}`} 
            >Finished</Link>
            <Link 
                href={"/battles/create"}
                role="tab" 
                className={`tab ${activeTab === "create" && "glass bg-[#bd93f9]"}`} 
            >Create new</Link>
        </div>
    );
}