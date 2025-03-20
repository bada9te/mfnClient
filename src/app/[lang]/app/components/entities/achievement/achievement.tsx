import { Achievement as TAchievement } from "@/app/utils/graphql-requests/generated/schema";
import { CheckCheck } from "lucide-react";

const getColor = (rarity: string) => {
    switch (rarity) {
        case "common": return "bg-blue-400";
        case "rare": return "bg-green-400";
        case "uncommon": return "bg-pink-400";
        case "legendary": return "bg-yellow-400"
        default: return "bg-base-300";
    }
}

export default function Achievement(props: {data: TAchievement, isCompleted: boolean}) {
    const {data, isCompleted} = props;
    return (
        <div className="card bg-base-100 text-neutral-content w-80 relative">
            <div className={`w-2 h-full ${getColor(data.rarity || "")} absolute `}></div>

            {
                isCompleted
                &&
                <CheckCheck className="absolute top-3 left-5"/>
            }

            <div className="card-body items-center text-center">
                <h2 className="card-title font-bold">{data.title}</h2>
                <p className="text-sm">{data.achievement}</p>
            </div>
        </div>
    );
}