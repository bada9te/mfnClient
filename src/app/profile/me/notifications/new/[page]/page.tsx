import NotificationsTabsBattles from "@/components/bars/bar-tabs/bar-tabs-notifications";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import { PreloadQuery } from "@/lib/apollo/client";
import { NOTIFICATIONS_QUERY } from "@/utils/graphql-requests/notifications";
import { cookies } from "next/headers";
import nextConfig from "@/../next.config.mjs";
import { Suspense } from "react";
import NotificationsContainerSkeleton from "@/components/containers/notifications-container/notifications-container-skeleton";
import NotificationsContainer from "@/components/containers/notifications-container/notifications-container";


export default function Notifications({params}: {params: { page: number }}) {
    return (
        <>
            <NotificationsTabsBattles activeTab={"new"}/>
            <HeroWrapper
                title="Unread notifications"
                description="Unread notifications"
            >
                <div className="card w-full min-h-screen">
                    <div className="flex flex-col gap-5">
                        <PreloadQuery
                            query={NOTIFICATIONS_QUERY}
                            variables={{
                                receiverId: cookies().get(nextConfig.env?.userIdCookieKey as string)?.value, 
                                checked: false, 
                                offset: (params.page - 1) * 12, 
                                limit: 12
                            }}
                        >
                            <Suspense fallback={<NotificationsContainerSkeleton/>}>
                                <NotificationsContainer
                                    page={params.page}
                                    offset={(params.page - 1) * 12}
                                    limit={12}
                                    checked={false}
                                    receiverId={cookies().get(nextConfig.env?.userIdCookieKey as string)?.value as string}
                                />
                            </Suspense>
                        </PreloadQuery>
                    </div>
                </div>
            </HeroWrapper>
        </>
    );
}