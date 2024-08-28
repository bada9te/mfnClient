import NotificationsTabs from "@/components/bars/bar-tabs/bar-tabs-notifications";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import { PreloadQuery } from "@/lib/apollo/client";
import { NOTIFICATIONS_QUERY } from "@/utils/graphql-requests/notifications";
import { cookies } from "next/headers";
import NotificationsContainerSkeleton from "@/components/containers/notifications-container/notifications-container-skeleton";
import NotificationsContainer from "@/components/containers/notifications-container/notifications-container";
import { Suspense } from "react";
import envCfg from "@/config/env";
import { TLang } from "@/types/language";
import { getDictionary } from "@/dictionaries/dictionaries";


export default async function Notifications({params}: {params: { page: number, lang: TLang }}) {
    const receiver = cookies().get(envCfg.userIdCookieKey as string)?.value as string;
    const dict = await getDictionary(params.lang);
    return (
        <>
            <NotificationsTabs activeTab={"new"} dictionary={dict.components}/>
            <HeroWrapper
                title={dict.app.profile.me.notifications.new.title}
                description={dict.app.profile.me.notifications.new.description}
            >
                <div className="card w-full">
                    <div className="flex flex-col gap-5">
                        <PreloadQuery
                            query={NOTIFICATIONS_QUERY}
                            variables={{
                                receiverId: receiver,
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
                                    receiverId={receiver}
                                    dictionary={dict.components}
                                />
                            </Suspense>
                        </PreloadQuery>
                    </div>
                </div>
            </HeroWrapper>
        </>
    );
}