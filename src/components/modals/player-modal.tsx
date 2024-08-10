"use client"
import { setTab } from "@/lib/redux/slices/bottom-bar";
import { useAppDispatch } from "@/lib/redux/store";
import React, { useEffect, useRef, useState } from "react";
import AudioPlayer from "../common/player/player";

export default function PlayerModal({button}: {button: React.ReactElement}) {
    const ref = useRef<HTMLDialogElement | null>(null);
    const dispatch = useAppDispatch();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    const handleOpen = () => {
        dispatch(setTab("player"));
        ref.current && ref.current.showModal();
    }

    const onClose = () => {
        dispatch(setTab(null));
    }

    if (!isMounted) {
        return;
    }

    return (
        <>
            {React.cloneElement(button, {
                onClick: handleOpen,
            })}
            <dialog ref={ref} className="modal w-full">
                <form method="dialog" className="modal-backdrop w-[100vw]">
                    <button onClick={onClose}>close</button>
                </form>
                <div className="modal-box text-gray-300 max-w-[350px] w-[100vw] h-fit md:max-w-[600px] md:w-[600px] no-scrollbar text-start flex flex-col glass">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h4 className="font-bold text-lg">In Player</h4>

                    <div className="flex-1 h-fit w-full flex justify-center items-end overflow-y-auto overflow-x-hidden mt-5 no-scrollbar">
                        <AudioPlayer/>
                    </div>
                </div>
            </dialog>
        </>
    );
}