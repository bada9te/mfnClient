"use client"
import {useAppDispatch} from "@/lib/redux/store";
import {setTab} from "@/lib/redux/slices/bottom-bar";
import React, {LegacyRef} from "react";

export default function LeftBarDrawer(props: {
    reference: LegacyRef<HTMLInputElement> | undefined
}) {
    const { reference } = props;
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
            <input ref={reference} id="my-drawer-tracks" type="checkbox" className="drawer-toggle w-full"
                   onChange={e => handleOpen(e)}/>
            <div className="drawer-side pt-16 z-10">
                <label htmlFor="my-drawer-tracks" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu w-80 md:w-[360px] min-h-full text-base-content glass bg-black">
                    {/* Sidebar content here */}
                    <label className="input input-bordered flex items-center justify-between gap-2 glass my-2">
                        <input type="text" className="w-fit placeholder:text-gray-200" placeholder="Search" />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                        </svg>
                    </label>
                    
                    <li><a>Track Item 1</a></li>
                    <li><a>Track Item 2</a></li>
                </ul>
            </div>
        </div>

    );
}