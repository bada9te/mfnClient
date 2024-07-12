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
                <ul className="menu p-4 w-80 md:w-[360px] min-h-full text-base-content glass bg-base-300">
                    {/* Sidebar content here */}
                    <li><a>Track Item 1</a></li>
                    <li><a>Track Item 2</a></li>
                </ul>
            </div>
        </div>

    );
}