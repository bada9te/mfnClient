import { Achievement as TAchievement } from "@/utils/graphql-requests/generated/schema";

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
        <div className="card bg-base-300 glass text-neutral-content w-80 relative">
            <div className={`w-2 h-full ${getColor(data.rarity || "")} absolute glass`}></div>

            {
                isCompleted
                &&
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 absolute right-3 top-3">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                </svg>
            }

            <div className="card-body items-center text-center">
                <h2 className="card-title font-bold">{data.title}</h2>
                <p className="text-sm">{data.achievement}</p>
            </div>
        </div>
    );
}