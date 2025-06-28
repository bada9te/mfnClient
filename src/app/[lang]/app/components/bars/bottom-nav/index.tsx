"use client"
import LeftBarDrawer from "./components/leftbar-drawer"
import RightBarDrawer from "./components/righbar-drawer";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "@/app/lib/redux/store";
import {usePathname} from "next/navigation";
import {useRef} from "react";
import { getDictionary } from "@/app/translations/dictionaries";
import { AudioLines, BadgePlus, Music, UserSearch } from "lucide-react";
import { setModalIsOpened } from "@/app/lib/redux/slices/player";

export default function BottomNav({
    dictionary
}: {
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const bottomBarTab = useAppSelector(state => state.bottomBar.tab);
    const pathname = usePathname();
    const leftbarOpenerRef = useRef<HTMLInputElement | undefined>(undefined);
    const rightbarOpenerRef = useRef<HTMLInputElement | undefined>(undefined);
    const dispatch = useAppDispatch();
    

    const handleOpen = (type: "left" | "right" | "center") => {
        switch (type) {
            case "center":
                break;
            case "left":
                leftbarOpenerRef && leftbarOpenerRef.current?.click();
                break;
            case "right":
                rightbarOpenerRef && rightbarOpenerRef.current?.click();
        }
    }

    // opens music-player modal
    const openPlayerModal = () => {
        dispatch(setModalIsOpened(true));
    }


    return (
        <>
            {/* @ts-ignore */}
            <LeftBarDrawer reference={leftbarOpenerRef} dictionary={dictionary}/>
            <div className="btm-nav text-base-content bg-base-100 z-50">
                <button className={bottomBarTab === "tracks" ? "active" : ""} onClick={() => handleOpen("left")}>
                    <Music />
                    <span className="btm-nav-label">{dictionary?.bars["bottom-nav"].tracks}</span>
                </button>

                <Link href={"/profile/me/upload"} className={pathname === "/profile/me/upload" ? "active" : ""}>
                    <BadgePlus/>
                    <span className="btm-nav-label">{dictionary?.bars["bottom-nav"]["new-post"]}</span>
                </Link>
                
                <button className={bottomBarTab === "player" ? "active" : ""} onClick={openPlayerModal}>
                    <AudioLines/>
                    <span className="btm-nav-label">{dictionary?.bars["bottom-nav"].player}</span>
                </button>
                
                <button className={bottomBarTab === "people" ? "active" : ""} onClick={() => handleOpen("right")}>
                    <UserSearch/>
                    <span className="btm-nav-label">{dictionary?.bars["bottom-nav"].people}</span>
                </button>
            </div>
            {/* @ts-ignore */}
            <RightBarDrawer reference={rightbarOpenerRef} dictionary={dictionary}/>
        </>
    );
}