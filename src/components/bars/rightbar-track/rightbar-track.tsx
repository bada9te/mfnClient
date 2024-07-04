"use client"
import CurrentTrackRightBar from "@/components/bars/current-track-rightbar/current-track-rightbar";
import {useAppSelector} from "@/lib/redux/store";
import {useEffect, useState} from "react";

export default function RightbarTrack() {
    const playerPost = useAppSelector(state => state.player.post);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <></>;
    }

    return (
        <div className={`hidden xl:${playerPost === null ? 'hidden' : 'block'} col-span-1`}>
            <div className="card bg-base-100 w-full main-layout-card rounded-none">
                <div className="overflow-y-auto p-0 pb-2 thin-scrollbar">
                    <CurrentTrackRightBar/>
                </div>
            </div>
        </div>
    );
}