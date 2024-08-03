"use client"
import Achievement from "@/components/entities/achievement/achievement";
import { useAllAchievementsSuspenseQuery, useUserQuery } from "@/utils/graphql-requests/generated/schema";
import AchievementsContainerSkeleton from "./achievements-container-skeleton";


export default function AchievementsContainer(props: {userId: string}) {
    const { userId } = props;

    const {data: achievements} = useAllAchievementsSuspenseQuery();

    const {data: userData, loading: userDataLoading} = useUserQuery({
        variables: {
            _id: userId,
        }
    });

    return (
        <>
            {
                userData && achievements && !userDataLoading
                ?
                achievements?.allAchievements?.map((i, key) => {
                    return (<Achievement data={i} key={key}/>);
                })
                :
                <AchievementsContainerSkeleton/>
            }
        </>
    );
}