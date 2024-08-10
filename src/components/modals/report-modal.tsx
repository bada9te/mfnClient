"use client"
import reportReasons from "@/config/report-reasons";
import { useReportCreateMutation } from "@/utils/graphql-requests/generated/schema";
import { useSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";

export default function ReportModal({button, postId}: {button: React.ReactElement, postId: string}) {
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
        enqueueSnackbar("Pending...", { autoHideDuration: 1500 });
        createReport({
            variables: {
                input: {
                    reportedPost: postId,
                    message: "default-report",
                    contactReason: selectedRason as string,
                }
            }
        }).then(_ => {
            enqueueSnackbar("Report submitted", {variant: 'success', autoHideDuration: 2500});
        }).catch(_ => {
            enqueueSnackbar("Sth went wrong, pls try again later", {variant: 'success', autoHideDuration: 3000});
        })
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
                    <button>close</button>
                </form>
                <div className="modal-box text-gray-300 max-w-[350px] w-[100vw] h-fit md:max-w-[600px] md:w-[600px] no-scrollbar text-start flex flex-col min-h-80">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h4 className="font-bold text-lg">Report</h4>

                    <div className="overflow-y-auto mt-5 no-scrollbar py-4">
                        <div className="flex flex-col gap-4">
                            {
                                reportReasons.map((i, key) => {
                                    return (
                                        <div className="form-control w-full">
                                            <div className="card glass w-full" key={key}>
                                                <label className="label cursor-pointer flex flex-row m-4">
                                                    <p className="flex flex-col gap-2">
                                                        <span className="card-title">
                                                            {i.title}
                                                        </span>
                                                        <span className="text-md">
                                                            {i.description}
                                                        </span>
                                                    </p>
                                                    <input type="radio" name="radio-10" className="radio checked:bg-accent" onClick={() => setSelectedReason(i.title)}/>
                                                </label>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>

                    <button className="btn btn-primary w-full mt-8 glass text-white" onClick={submitReport} disabled={selectedRason === null}>Submit</button>
                </div>
            </dialog>
        </>
    );
}