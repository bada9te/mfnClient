import { setTab } from "@/lib/redux/slices/bottom-bar";
import { useAppDispatch } from "@/lib/redux/store";
import React, { useRef } from "react";

export default function PlayerModal({button}: {button: React.ReactElement}) {
    const ref = useRef<HTMLDialogElement | null>(null);
    const dispatch = useAppDispatch();

    const handleOpen = () => {
        dispatch(setTab("player"));
        ref.current && ref.current.showModal();
    }

    const onClose = () => {
        dispatch(setTab(null));
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
                <div className="modal-box text-gray-300 max-w-[350px] w-[100vw] h-[600px] md:max-w-[600px] md:w-[600px] md:max-h-96 no-scrollbar text-start flex flex-col">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h4 className="font-bold text-lg">In Player</h4>

                    <div className="flex-1 min-h-full w-full flex justify-center items-start overflow-y-auto overflow-x-hidden mt-5 thin-scrollbar">
                        DATA
                    </div>

                    <div className="modal-action"> 
                        <button className="btn">BTN</button>
                        <button className="btn">BTN</button>
                    </div>
                </div>
            </dialog>
        </>
    );
}