import Achievement from "@/components/entities/achievement/achievement";
import AchievementSkeleton from "@/components/entities/achievement/achievement-skeleton";
import { Achievement as TAchievement } from "@/utils/graphql-requests/generated/schema";


const d: TAchievement = {
    title: "First Save",
    description: "Someone enjoyed your music so much that they wanted to keep it for later. Well done!",
    _id: "ajhukdhakwyuhkahdka",
    achievement: "Your post has been saved to a bookmark for the first time.",
    posNumber: 1,
    rarity: "rare",
    count: 0,
    type: "common",
}

export default function AchievementsContainer() {
    return (
        <>
            <Achievement data={d as TAchievement}/>
            <Achievement data={d as TAchievement}/>
            <Achievement data={d as TAchievement}/>
            <Achievement data={d as TAchievement}/>
            <Achievement data={d as TAchievement}/>
            <Achievement data={d as TAchievement}/>
            <Achievement data={d as TAchievement}/>
            <Achievement data={d as TAchievement}/>
            <Achievement data={d as TAchievement}/>
            <Achievement data={d as TAchievement}/>
            <Achievement data={d as TAchievement}/>
        </>
    );
}