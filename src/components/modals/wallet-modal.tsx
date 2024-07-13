import { setTab } from "@/lib/redux/slices/bottom-bar";
import { useAppDispatch } from "@/lib/redux/store";
import { useAccountModal, useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import React, { useRef } from "react";
import { useAccount } from "wagmi";

export default function WalletModal({button}: {button: React.ReactElement}) {
    const ref = useRef<HTMLDialogElement | null>(null);
    const dispatch = useAppDispatch();
    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();
    const { openChainModal } = useChainModal();
    const account = useAccount();

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
                <div className="modal-box glass text-gray-300 max-w-[350px] w-[100vw] h-[600px] md:max-w-[600px] md:w-[600px] md:max-h-96 no-scrollbar text-start flex flex-col">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h4 className="font-bold text-lg">Wallet</h4>

                    <div className="flex-1 min-h-full w-full flex justify-center items-start overflow-y-auto overflow-x-hidden mt-5 thin-scrollbar">
                        {account.address && <p>{account.address}</p>}
                    </div>

                    <div className="modal-action"> 
                        <div className="join">
                            {
                                openConnectModal &&
                                <div className="btn btn-primary" onClick={openConnectModal}>Connect</div>
                            }
                            {
                                openAccountModal &&
                                <div className="btn btn-primary" onClick={openAccountModal}>Account</div>
                            }
                            {
                                openChainModal &&
                                <div className="btn btn-primary" onClick={openChainModal}>Switch chain</div>
                            }
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
}