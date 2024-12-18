"use client"
import reportReasons from "@/config/report-reasons";
import { getDictionary } from "@/dictionaries/dictionaries";
import { useReportCreateMutation } from "@/utils/graphql-requests/generated/schema";
import { X } from "lucide-react";
import { useSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";
import MainButton from "../common/main-button/main-button";

export default function ReportModal({
    button,
    postId,
    dictionary
}: {
    button: React.ReactElement;
    postId: string;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const ref = useRef<HTMLDialogElement | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [selectedRason, setSelectedReason] = useState<string | null>(null);
    const [createReport] = useReportCreateMutation();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setIsMounted(true);
    }, [])

    const handleOpen = () => {
        ref.current && ref.current.showModal();
    }

    const submitReport = () => {
        if (!selectedRason) {
            enqueueSnackbar("Report reason is not selected", {variant: 'error', autoHideDuration: 3000});
            return;
        }
        ref.current && ref.current.close();
        enqueueSnackbar("Pending...", { autoHideDuration: 1500 });
        createReport({
            variables: {
                input: {
                    reportedPost: postId,
                    message: selectedRason as string,
                    contactReason: selectedRason as string,
                }
            }
        }).then(_ => {
            enqueueSnackbar("Report submitted", {variant: 'success', autoHideDuration: 2500});
        }).catch(_ => {
            enqueueSnackbar("Sth went wrong, pls try again later", {variant: 'error', autoHideDuration: 3000});
        });
    }

    if (!isMounted) {
        return;
    }

    return (
        <>
            {React.cloneElement(button, {
                onClick: handleOpen,
            })}
            <dialog ref={ref} className="modal w-full cursor-default">
                <form method="dialog" className="modal-backdrop w-[100vw]">
                    <button>close</button>
                </form>
                <div className="modal-box text-gray-300 max-w-[350px] w-[100vw] h-fit md:max-w-[600px] md:w-[600px] no-scrollbar text-start flex flex-col min-h-80 ">
                    <form method="dialog" style={{ width:"32px", position: 'absolute', right: '14px', top: '14px' }}>
                        {/* if there is a button in form, it will close the modal */}
                        <MainButton handler={() => {}} color="error" width="25px" height="25px" padding="1">
                            <X/>
                        </MainButton>
                    </form>

                    <h4 className="font-bold text-lg">{dictionary.modals.report.report}</h4>

                    <div className="overflow-y-auto mt-5 no-scrollbar py-4">
                        <div className="flex flex-col gap-4">
                            {
                                reportReasons.map((i, key) => {
                                    return (
                                        <div className="form-control w-full" key={key}>
                                            <div className="card w-full bg-base-300">
                                                <label className="label cursor-pointer flex flex-row m-4">
                                                    <p className="flex flex-col gap-2">
                                                        <span className="card-title">
                                                            {/* @ts-ignore */}
                                                            {dictionary.modals.report.cards[i.id].title}
                                                        </span>
                                                        <span className="text-md">
                                                            {/* @ts-ignore */}
                                                            {dictionary.modals.report.cards[i.id].description}
                                                        </span>
                                                    </p>
                                                    <input type="radio" name="radio-10" className="radio checked:bg-[#4ba09e]" onClick={() => setSelectedReason(i.id)}/>
                                                </label>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>

                    <button className="btn  w-full mt-8  text-base-content" onClick={submitReport} disabled={selectedRason === null}>{dictionary.modals.report.submit}</button>
                </div>
            </dialog>
        </>
    );
}