"use client"
import { useRouter } from "next/navigation";

export default function NotificationsTabsBattles(props: {
    activeTab: "new" | "read";
}) {
    const { activeTab } = props;

    const router = useRouter();

    const handleNavigate = (a: typeof activeTab, counterPage?: boolean) => {
        router.replace(`/profile/me/notifications/${a}${counterPage ? '/1' : ''}`);
    };


    return (
        <div role="tablist" className="tabs tabs-boxed w-full rounded-none md:rounded-xl bg-base-100 m-0 md:mx-8 md:mt-8">
            <a 
                role="tab" 
                className={`tab ${activeTab === "new" && "tab-active glass"}`}
                onClick={() => handleNavigate("new", true)}
            >New</a>
            <a 
                role="tab" 
                className={`tab ${activeTab === "read" && "tab-active glass"}`}
                onClick={() => handleNavigate("read", true)}
            >Reviewed</a>
        </div>
    );
}