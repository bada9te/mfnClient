import React, { useRef } from "react";
import AddCommentForm from "../forms/add-comment";
import { Post } from "@/utils/graphql-requests/generated/schema";

export default function CommentsModal({postData, button}: {postData: Post, button: React.ReactElement}) {
    const ref = useRef<HTMLDialogElement | null>(null);

    const handleOpen = () => {
        ref.current && ref.current.showModal();
    }

    return (
        <>
            {React.cloneElement(button, {
                onClick: handleOpen,
            })}
            <dialog ref={ref} className="modal">
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
                <div className="modal-box text-gray-300 max-w-[600px] h-[600px] no-scrollbar text-start flex flex-col">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h4 className="font-bold text-lg">{postData.title} - Comments</h4>

                    <AddCommentForm/>
                </div>
            </dialog>
        </>
    );
}