"use client"
import LeftBarDrawer from "@/components/modals/leftbar-drawer/leftbar-drawer"
import RightBarDrawer from "@/components/modals/righbar-drawer/rightbar-drawer";
import Link from "next/link";
import {useAppSelector} from "@/lib/redux/store";
import {usePathname} from "next/navigation";
import {useRef} from "react";
import PlayerModal from "@/components/modals/player-modal";
import { getDictionary } from "@/dictionaries/dictionaries";
import { AudioLines, BadgePlus, Music, UserSearch } from "lucide-react";

export default function BottomNav({
    dictionary
}: {
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const bottomBarTab = useAppSelector(state => state.bottomBar.tab);
    const pathname = usePathname();
    const leftbarOpenerRef = useRef<HTMLInputElement | undefined>(undefined);
    const rightbarOpenerRef = useRef<HTMLInputElement | undefined>(undefined);
    

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


    return (
        <>
            {/* @ts-ignore */}
            <LeftBarDrawer reference={leftbarOpenerRef} dictionary={dictionary}/>
            <div className="btm-nav text-white bg-base-300 glass z-50 bg-opacity-50">
                <button className={`${bottomBarTab === "tracks" ? "active" : ""} active:bg-base-300`} onClick={() => handleOpen("left")}>
                    <Music />
                    <span className="btm-nav-label">{dictionary?.bars["bottom-nav"].tracks}</span>
                </button>

                <Link href={"/profile/me/upload"} className={pathname === "/profile/me/upload" ? "active" : ""}>
                    <BadgePlus/>
                    <span className="btm-nav-label">{dictionary?.bars["bottom-nav"]["new-post"]}</span>
                </Link>
                <PlayerModal
                    dictionary={dictionary}
                    button={
                        <button className={bottomBarTab === "player" ? "active" : ""}>
                            <AudioLines/>
                            <span className="btm-nav-label">{dictionary?.bars["bottom-nav"].player}</span>
                        </button>
                    }
                />
                
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