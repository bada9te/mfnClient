"use client"
import Link from "next/link";


export default function NotificationsTabsBattles(props: {
    activeTab: "new" | "read";
}) {
    const { activeTab } = props;

    return (
        <div role="tablist" className="tabs tabs-boxed w-full rounded-none bg-black glass m-0 md:mx-8 md:mt-8">
            <Link 
                role="tab" 
                className={`tab ${activeTab === "new" && "glass bg-[#1ba39c]"}`}
                href={"/profile/me/notifications/new/1"}
            >New</Link>
            <Link 
                role="tab" 
                className={`tab ${activeTab === "read" && "glass bg-[#1ba39c]"}`}
                href={"/profile/me/notifications/read/1"}
            >Reviewed</Link>
        </div>
    );
}