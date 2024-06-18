"use client"
import {useAppDispatch} from "@/lib/redux/store";
import {setTab} from "@/lib/redux/slices/bottom-bar";

export default function LeftBarDrawer() {
    const dispatch = useAppDispatch();

    const handleOpen = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            dispatch(setTab("tracks"));
        } else {
            dispatch(setTab(null));
        }
    }

    return (
        <div className="drawer">
            <input id="my-drawer-tracks" type="checkbox" className="drawer-toggle w-full" onChange={e => handleOpen(e)}/>
            <div className="drawer-content w-max">
                {/* Page content here */}

                <label htmlFor="my-drawer-tracks" className="drawer-button cursor-pointer flex flex-col justify-center items-center text-center w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z" clipRule="evenodd" />
                    </svg>
                    <span className="btm-nav-label">Tracks</span>
                </label>
            </div>
            <div className="drawer-side pt-16 z-10">
                <label htmlFor="my-drawer-tracks" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li><a>Track Item 1</a></li>
                    <li><a>Track Item 2</a></li>
                </ul>
            </div>
        </div>
    );
}