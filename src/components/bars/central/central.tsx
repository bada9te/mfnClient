"use client"
import Footer from "@/components/common/footer/footer";
import {useAppSelector} from "@/lib/redux/store";
import {useEffect, useState} from "react";

export default function CentralBlock({children}: {
    children?: React.ReactNode;
}) {
    const playerPost = useAppSelector(state => state.player.post);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <></>
    }

    return (
        <div className={`col-span-5 xl:${playerPost === null ? "col-span-4" : "col-span-3"} flex-1`}>
            <div className="card bg-base-100 shadow-xl w-full main-layout-card rounded-none">
                <div className="card-body overflow-y-auto p-0 gap-0 thin-scrollbar">
                    {children}
                    <Footer/>
                </div>
            </div>
        </div>
    );
}