"use client"
import { useRouter } from "next/navigation";

export default function ChatsTabsBattles(props: {
    activeTab: "list" | "chat" | "settings";
}) {
    const { activeTab } = props;

    const router = useRouter();

    const handleNavigate = (a: typeof activeTab, counterPage?: boolean) => {
        router.replace(`/profile/me/chats/${a}${counterPage ? '/1' : ''}`);
    };


    return (
        <div role="tablist" className="tabs tabs-boxed w-full rounded-none">
            <a
                role="tab"
                className={`tab ${activeTab === "list" && "tab-active"}`}
                onClick={() => handleNavigate("list", true)}
            >List of chats</a>
            <a
                role="tab"
                className={`tab ${activeTab === "chat" && "tab-active"}`}
                onClick={() => handleNavigate("chat", true)}
            >Chat</a>
            <a
                role="tab"
                className={`tab ${activeTab === "settings" && "tab-active"}`}
                onClick={() => handleNavigate("settings", true)}
            >Chat settings</a>
        </div>
    );
}