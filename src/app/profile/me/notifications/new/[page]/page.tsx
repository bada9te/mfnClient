import NotificationsTabsBattles from "@/components/bars/bar-tabs/bar-tabs-notifications";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import Notification from "@/components/entities/notification/notification";


export default function Notifications({params}: {params: { page: number }}) {
    return (
        <>
            <NotificationsTabsBattles activeTab={"new"}/>
            <HeroWrapper
                title="Unread notifications"
                description="Unread notifications"
            >
                <div className="card shadow-2xl glass w-full min-h-screen">
                    <div className="card card-body flex flex-col gap-5 md:p-10">
                        <Notification/>
                        <Notification/>
                        <Notification/>
                    </div>
                </div>
            </HeroWrapper>
        </>
    );
}