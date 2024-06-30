"use client"
import LeftBarDrawer from "@/components/modals-popups/leftbar-drawer/leftbar-drawer"
import RightBarDrawer from "@/components/modals-popups/righbar-drawer/rightbar-drawer";
import Link from "next/link";
import {useAppSelector} from "@/lib/redux/store";
import {usePathname} from "next/navigation";
import {useRef} from "react";

export default function BottomNav() {
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
            <LeftBarDrawer reference={leftbarOpenerRef}/>
            <div className="btm-nav">
                <button className={bottomBarTab === "tracks" ? "active" : ""} onClick={() => handleOpen("left")}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd"
                              d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z"
                              clipRule="evenodd"/>
                    </svg>
                    <span className="btm-nav-label">Tracks</span>
                </button>

                <Link href={"/profile/me/upload"} className={pathname === "/profile/me/upload" ? "active" : ""}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                              clipRule="evenodd"/>
                    </svg>
                    <span className="btm-nav-label">New post</span>
                </Link>
                <button className={bottomBarTab === "player" ? "active" : ""}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd"
                              d="M20.432 4.103a.75.75 0 0 0-.364-1.456L4.128 6.632l-.2.033C2.498 6.904 1.5 8.158 1.5 9.574v9.176a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V9.574c0-1.416-.997-2.67-2.429-2.909a49.017 49.017 0 0 0-7.255-.658l7.616-1.904Zm-9.585 8.56a.75.75 0 0 1 0 1.06l-.005.006a.75.75 0 0 1-1.06 0l-.006-.006a.75.75 0 0 1 0-1.06l.005-.005a.75.75 0 0 1 1.06 0l.006.005ZM9.781 15.85a.75.75 0 0 0 1.061 0l.005-.005a.75.75 0 0 0 0-1.061l-.005-.005a.75.75 0 0 0-1.06 0l-.006.005a.75.75 0 0 0 0 1.06l.005.006Zm-1.055-1.066a.75.75 0 0 1 0 1.06l-.005.006a.75.75 0 0 1-1.061 0l-.005-.005a.75.75 0 0 1 0-1.06l.005-.006a.75.75 0 0 1 1.06 0l.006.005ZM7.66 13.73a.75.75 0 0 0 1.061 0l.005-.006a.75.75 0 0 0 0-1.06l-.005-.006a.75.75 0 0 0-1.06 0l-.006.006a.75.75 0 0 0 0 1.06l.005.006ZM9.255 9.75a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75V10.5a.75.75 0 0 1 .75-.75h.008Zm3.624 3.28a.75.75 0 0 0 .275-1.025L13.15 12a.75.75 0 0 0-1.025-.275l-.006.004a.75.75 0 0 0-.275 1.024l.004.007a.75.75 0 0 0 1.025.274l.006-.003Zm-1.38 5.126a.75.75 0 0 1-1.024-.275l-.004-.006a.75.75 0 0 1 .275-1.025l.006-.004a.75.75 0 0 1 1.025.275l.004.007a.75.75 0 0 1-.275 1.024l-.006.004Zm.282-6.776a.75.75 0 0 0-.274-1.025l-.007-.003a.75.75 0 0 0-1.024.274l-.004.007a.75.75 0 0 0 .274 1.024l.007.004a.75.75 0 0 0 1.024-.275l.004-.006Zm1.369 5.129a.75.75 0 0 1-1.025.274l-.006-.004a.75.75 0 0 1-.275-1.024l.004-.007a.75.75 0 0 1 1.025-.274l.006.004a.75.75 0 0 1 .275 1.024l-.004.007Zm-.145-1.502a.75.75 0 0 0 .75-.75v-.007a.75.75 0 0 0-.75-.75h-.008a.75.75 0 0 0-.75.75v.007c0 .415.336.75.75.75h.008Zm-3.75 2.243a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75V18a.75.75 0 0 1 .75-.75h.008Zm-2.871-.47a.75.75 0 0 0 .274-1.025l-.003-.006a.75.75 0 0 0-1.025-.275l-.006.004a.75.75 0 0 0-.275 1.024l.004.007a.75.75 0 0 0 1.024.274l.007-.003Zm1.366-5.12a.75.75 0 0 1-1.025-.274l-.004-.006a.75.75 0 0 1 .275-1.025l.006-.004a.75.75 0 0 1 1.025.275l.004.006a.75.75 0 0 1-.275 1.025l-.006.004Zm.281 6.215a.75.75 0 0 0-.275-1.024l-.006-.004a.75.75 0 0 0-1.025.274l-.003.007a.75.75 0 0 0 .274 1.024l.007.004a.75.75 0 0 0 1.024-.274l.004-.007Zm-1.376-5.116a.75.75 0 0 1-1.025.274l-.006-.003a.75.75 0 0 1-.275-1.025l.004-.007a.75.75 0 0 1 1.025-.274l.006.004a.75.75 0 0 1 .275 1.024l-.004.007Zm-1.15 2.248a.75.75 0 0 0 .75-.75v-.007a.75.75 0 0 0-.75-.75h-.008a.75.75 0 0 0-.75.75v.007c0 .415.336.75.75.75h.008ZM17.25 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm1.5 6a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"
                              clipRule="evenodd"/>
                    </svg>
                    <span className="btm-nav-label">Player</span>
                </button>
                <button className={bottomBarTab === "people" ? "active" : ""} onClick={() => handleOpen("right")}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd"
                              d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                              clipRule="evenodd"/>
                        <path
                            d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z"/>
                    </svg>
                    <span className="btm-nav-label">People</span>
                </button>
            </div>
            {/* @ts-ignore */}
            <RightBarDrawer reference={rightbarOpenerRef}/>
        </>
    );
}