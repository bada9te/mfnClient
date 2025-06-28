import NotificationsTabsBattles from "../../components/navigation-bar";
import HeroWrapper from "@/app/[lang]/app/components/wrappers/hero-wrapper";
import { PreloadQuery } from "@/app/lib/apollo/client";
import { NOTIFICATIONS_QUERY } from "@/app/utils/graphql-requests/notifications";
import { cookies } from "next/headers";
import { Suspense } from "react";
import NotificationsContainerSkeleton from "@/app/[lang]/app/components/containers/notifications-container/notifications-container-skeleton";
import NotificationsContainer from "@/app/[lang]/app/components/containers/notifications-container/notifications-container";
import envCfg from "@/app/config/env";
import { TLang } from "@/app/types/language";
import { getDictionary } from "@/app/translations/dictionaries";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Tunes Hub - Reviewed notifications',
    description: 'Reviewed notifications',
}

export default async function Notifications({params}: {params: { page: number, lang: TLang }}) {
    const receiver = cookies().get(envCfg.userIdCookieKey as string)?.value as string;
    const dict = await getDictionary(params.lang);
    return (
        <>
            <NotificationsTabsBattles activeTab={"read"} dictionary={dict.components}/>
            <HeroWrapper
                title={dict.app.profile.me.notifications.read.title}
                description={dict.app.profile.me.notifications.read.description}
            >
                <div className="card w-full">
                    <div className="flex flex-col gap-5">
                        <PreloadQuery
                            query={NOTIFICATIONS_QUERY}
                            variables={{
                                receiverId: receiver, 
                                checked: true, 
                                offset: (params.page - 1) * 12, 
                                limit: 12
                            }}
                        >
                            <Suspense fallback={<NotificationsContainerSkeleton/>}>
                                <NotificationsContainer
                                    page={params.page}
                                    offset={(params.page - 1) * 12}
                                    limit={12}
                                    checked={true}
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