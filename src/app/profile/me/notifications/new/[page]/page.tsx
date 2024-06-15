import Pagination from "@/components/pagination/pagination";
import NotificationsTabsBattles from "@/components/bars/bar-tabs/bar-tabs-notifications";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import Notification from "@/components/entities/notification/notification";


export default function Notifications({params}: {params: { page: number }}) {
    return (
        <>
            <NotificationsTabsBattles activeTab={"new"}/>
            <HeroWrapper
                bgStyles="bg-[url('/assets/bgs/newPostFormBG.png')] bg-right"
                title="Unread notifications"
                description="Unread notifications"
            >
                <div className="card shadow-2xl glass w-fit min-h-screen">
                    <div className="card card-body flex flex-col gap-5 md:p-10">
                        <Notification/>
                        <Notification/>
                        <Notification/>
                    </div>
                    <Pagination/>
                </div>
            </HeroWrapper>
        </>
    );
}