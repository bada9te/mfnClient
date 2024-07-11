import React, { useRef } from "react";
import AddCommentForm from "../forms/add-comment";
import { Post } from "@/utils/graphql-requests/generated/schema";
import CommentsContainer from "../containers/comments-container/comments-container";

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
            <dialog ref={ref} className="modal no-scrollbar">
                <form method="dialog" className="modal-backdrop w-[100vw]">
                    <button>close</button>
                </form>
                <div className="modal-box text-gray-300 max-w-[600px] min-h-screen no-scrollbar text-start flex flex-col rounded-none">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h4 className="font-bold text-lg">{postData?.title} - Comments</h4>

                    <div className="flex-1 min-h-full w-full flex justify-center items-start overflow-y-auto overflow-x-hidden mt-5 thin-scrollbar">
                        <CommentsContainer/>
                    </div>

                    <div className="modal-action"> 
                        <AddCommentForm/>
                    </div>
                </div>
            </dialog>
        </>
    );
}