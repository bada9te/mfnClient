import NotificationsTabs from "../../components/navigation-bar";
import HeroWrapper from "@/app/[lang]/components/wrappers/hero-wrapper";
import { PreloadQuery } from "@/app/lib/apollo/client";
import { NOTIFICATIONS_QUERY } from "@/app/utils/graphql-requests/notifications";
import { cookies } from "next/headers";
import NotificationsContainerSkeleton from "@/app/[lang]/components/containers/notifications-container/notifications-container-skeleton";
import NotificationsContainer from "@/app/[lang]/components/containers/notifications-container/notifications-container";
import { Suspense } from "react";
import envCfg from "@/app/config/env";
import { TLang } from "@/app/types/language";
import { getDictionary } from "@/app/translations/dictionaries";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Tunes Hub - Unread notifications',
    description: 'Unread notifications',
}

export default async function Notifications({params}: {params: { page: number, lang: TLang }}) {
    const {lang, page} = await params;
    const receiver = (await cookies()).get(envCfg.userIdCookieKey as string)?.value as string;
    const dict = await getDictionary(lang);
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
                                offset: (page - 1) * 12, 
                                limit: 12
                            }}
                        >
                            <Suspense fallback={<NotificationsContainerSkeleton/>}>
                                <NotificationsContainer
                                    page={page}
                                    offset={(page - 1) * 12}
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