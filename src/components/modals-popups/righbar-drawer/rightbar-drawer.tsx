"use client"
import {setTab} from "@/lib/redux/slices/bottom-bar";
import {useAppDispatch} from "@/lib/redux/store";
import {LegacyRef} from "react";

export default function RightBarDrawer(props: {
    reference: LegacyRef<HTMLInputElement> | undefined
}) {
    const { reference } = props;
    const dispatch = useAppDispatch();
    const handleOpen = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            dispatch(setTab("people"));
        } else {
            dispatch(setTab(null));
        }
    }

    return (
        <div className="drawer drawer-end">
            <input ref={reference} id="my-drawer-people" type="checkbox" className="drawer-toggle" onChange={e => handleOpen(e)}/>

            <div className="drawer-side pt-16 z-10">
                <label htmlFor="my-drawer-people" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li><a>User Item 1</a></li>
                    <li><a>User Item 2</a></li>
                </ul>
            </div>
        </div>
    );
}