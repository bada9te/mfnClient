"use client"
import { getDictionary } from "@/app/dictionaries/dictionaries";
import Link from "next/link";


export default function BarTabsBattles(props: {
    activeTab: "in-progress" | "finished" | "mine" | "create";
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const { activeTab, dictionary } = props;

    return (
        <div role="tablist" className="tabs tabs-boxed w-full bg-base-300 m-0 mx-2 mt-4 md:mx-4 md:mt-4 rounded-xl">
            <Link
                href={"/battles/in-progress/1"}
                role="tab" 
                className={`tab ${activeTab === "in-progress" && "bg-[#1ba39c] text-base-content"}`} 
            >{dictionary?.bars["bar-tabs"]["bar-tabs-battles"]["in-progress"]}</Link>
            <Link
                href={"/battles/finished/1"}
                role="tab" 
                className={`tab ${activeTab === "finished" && "bg-[#1ba39c] text-base-content"}`} 
            >{dictionary?.bars["bar-tabs"]["bar-tabs-battles"].finished}</Link>
            <Link
                href={"/battles/finished/me/1"}
                role="tab" 
                className={`tab ${activeTab === "mine" && "bg-[#1ba39c] text-base-content"}`} 
            >{dictionary?.bars["bar-tabs"]["bar-tabs-battles"].mine}</Link>
            <Link 
                href={"/battles/create"}
                role="tab" 
                className={`tab ${activeTab === "create" && "bg-[#1ba39c] text-base-content"}`} 
            >{dictionary?.bars["bar-tabs"]["bar-tabs-battles"]["create-new"]}</Link>
        </div>
    );
}