"use client"
import { getDictionary } from "@/app/translations/dictionaries";
import React, { useEffect, useRef, useState } from "react";
import MainButton from "../../../../common/main-button/main-button";
import { Wallet, X } from "lucide-react";


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
                        <MainButton onClick={handleCloseModal} color="error" className="w-[25px] h-[25px] p-1">
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
                                className="input input-sm bg-base-200 input-bordered shadow-md  placeholder:text-gray-200 text-base-content" 
                                onChange={(e) => setEnteredAmount(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="modal-action z-50"> 
                        
                        <button className="btn btn-sm w-full  text-base-content" onClick={handleCloseModal} disabled={enteredAmount === 0}>
                            <Wallet/>
                            {dictionary.modals["select-usdc"].select}<span className="font-bold text-[#23d7d3]">{enteredAmount} USDC</span>{dictionary.modals["select-usdc"].tokens}
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}