import { setTab } from "@/lib/redux/slices/bottom-bar";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Post as TPost, usePostsByTitleLazyQuery } from "@/utils/graphql-requests/generated/schema";
import React, { useRef } from "react";
import Post from "../entities/post/post";
import InfoImage from "../common/info-image/info-image";
import PostsContainerSkeleton from "../containers/posts-container/posts-container-skeleton";


export default function SelectTrackModal({
    button
}: {
    button: React.ReactElement, 
    userIsOwner: boolean,
    handleSelect: (a: TPost) => void;
}) {
    const ref = useRef<HTMLDialogElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.user);

    const [ searchTracksByTitle, {data, loading} ] = usePostsByTitleLazyQuery();

    const handleOpen = () => {
        ref.current && ref.current.showModal();
    }

    const onClose = () => {
        dispatch(setTab(null));
    }


    const handleSearch = () => {
        inputRef.current && inputRef.current.value.length &&
        searchTracksByTitle({
            variables: {
                input: {
                    userId: user._id,
                    userIsOwner: false,
                    title: inputRef.current.value
                }
            }
        });
    }



    return (
        <>
            {React.cloneElement(button, {
                onClick: handleOpen,
            })}
            <dialog ref={ref} className="modal w-full h-full absolute">
                <div className="modal-box glass rounded-none text-gray-300 min-w-[100vw] min-h-[100vh] no-scrollbar text-start flex flex-col">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 p-2">✕</button>
                    </form>
                    <h4 className="font-bold text-lg z-50 text-white">Track selection</h4>

                    <div className="flex min-h-full flex-1">
                        {
                            loading
                            ?
                            <div className="flex-1 min-h-full w-full flex justify-center items-start overflow-y-auto overflow-x-hidden mt-5 thin-scrollbar">
                                <div className="flex flex-row flex-wrap gap-5 w-full justify-center">
                                    <PostsContainerSkeleton/>
                                </div>
                            </div>
                            :
                            <>
                                {
                                    data?.postsByTitle && data.postsByTitle.length > 0
                                    ?
                                    <div className="flex-1 min-h-full w-full flex justify-center items-start overflow-y-auto overflow-x-hidden mt-5 thin-scrollbar">
                                        {
                                            data.postsByTitle.map((p, k) => {
                                                return <Post key={k} data={p as TPost}/>
                                            })
                                        }
                                    </div>
                                    :
                                    <div className="flex-1 min-h-full w-full flex justify-center items-center overflow-y-auto overflow-x-hidden mt-5 thin-scrollbar">
                                        <InfoImage text="No tracks yet, input the search query and click 'Search' to start searching"/>
                                    </div>
                                }
                            </>
                        }
                    </div>

                    <div className="modal-action z-50"> 
                        <div className="join w-full">
                            <input ref={inputRef} className="input input-bordered join-item w-full glass bg-black placeholder:text-gray-200" placeholder="Track title" />
                            <button onClick={handleSearch} className="btn join-item btn-primary glass text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                                </svg>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
}