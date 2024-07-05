"use client"
import CurrentTrackRightBar from "@/components/bars/current-track-rightbar/current-track-rightbar";
import {useAppDispatch, useAppSelector} from "@/lib/redux/store";
import {useEffect, useState} from "react";
import {setPost} from "@/lib/redux/slices/player";

export default function RightbarTrack() {
    const playerPost = useAppSelector(state => state.player.post);
    const [isMounted, setIsMounted] = useState(false);
    const dispatch = useAppDispatch();


    const handleCloseRightbar = () => {
        dispatch(setPost(null));
    }

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <></>;
    }

    return (
        <div className={`hidden xl:block col-auto max-w-80`}>
            <div className="card bg-base-100 w-full main-layout-card rounded-none">
                <div className="overflow-y-auto p-0 pb-2 thin-scrollbar">
                    <div className="h-[80px] flex justify-between items-center text-white px-5">
                        <p className="font-bold text-xl">In player:</p>
                        <button className="btn btn-sm btn-circle btn-ghost" onClick={handleCloseRightbar}>✕</button>
                    </div>
                    <CurrentTrackRightBar/>
                </div>
            </div>
        </div>
    );
}