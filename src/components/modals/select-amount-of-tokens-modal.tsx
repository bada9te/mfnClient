"use client"
import { getDictionary } from "@/dictionaries/dictionaries";
import React, { useEffect, useRef, useState } from "react";
import MainButton from "../common/main-button/main-button";
import { X } from "lucide-react";


export default function SelectAmountOfMFNTokens({button, type, handleClose, dictionary}: {
    button: React.ReactElement, 
    type: "post1Score" | "post2Score", 
    handleClose: (amount: number, type: "post1Score" | "post2Score") => void;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const ref = useRef<HTMLDialogElement | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [enteredAmount, setEnteredAmount] = useState(0);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleOpen = () => {
        ref.current && ref.current.showModal();
    }

    const handleCloseModal = () => {
        handleClose(enteredAmount, type);
        ref.current && ref.current.close();
    }

    if (!isMounted) {
        return;
    }

    return (
        <>
            {React.cloneElement(button, {
                onClick: handleOpen,
            })}
            <dialog ref={ref} className="modal w-full cursor-default no-scrollbar">
                <form method="dialog" className="modal-backdrop w-[100vw] no-scrollbar">
                    <button>close</button>
                </form>
                <div className="modal-box text-gray-300 max-w-[350px] w-[100vw] h-fit md:max-w-[600px] md:w-[600px] no-scrollbar text-start flex flex-col ">
                    <form method="dialog" style={{ width:"32px", position: 'absolute', right: '14px', top: '14px' }}>
                        {/* if there is a button in form, it will close the modal */}
                        <MainButton handler={() => {}} color="error" width="25px" height="25px" padding="1">
                            <X/>
                        </MainButton>
                    </form>

                    <h4 className="font-bold text-lg">{dictionary.modals["select-usdc"]["select-amount"]}</h4>

                    <div className="py-1">
                        <div className="form-control md:px-0">
                            <label className="label">
                                <span className="label-text">{dictionary.modals["select-usdc"].amount}</span>
                            </label>
                            <input 
                                type="number" 
                                placeholder={dictionary.modals["select-usdc"].amount} 
                                className="input input-bordered shadow-md  placeholder:text-gray-200 text-base-content" 
                                onChange={(e) => setEnteredAmount(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="modal-action z-50"> 
                        <button className="btn  w-full  text-base-content" onClick={handleCloseModal} disabled={enteredAmount === 0}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z" />
                            </svg>
                            {dictionary.modals["select-usdc"].select}<span className="font-bold text-[#23d7d3]">{enteredAmount} USDC</span>{dictionary.modals["select-usdc"].tokens}
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}