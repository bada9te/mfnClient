"use client"
import { setTab } from "@/app/lib/redux/slices/bottom-bar";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/store";
import { Post as TPost, usePostsByTitleLazyQuery } from "@/app/utils/graphql-requests/generated/schema";
import React, { useRef } from "react";
import Post from "../entities/post/post";
import InfoImage from "../common/info-image/info-image";
import PostsContainerSkeleton from "../containers/posts-container/posts-container-skeleton";
import { getDictionary } from "@/app/dictionaries/dictionaries";
import MainButton from "../common/main-button/main-button";
import { ScanSearch, X } from "lucide-react";


export default function SelectTrackModal({
    button,
    userIsOwner,
    handleSelect,
    dictionary
}: {
    button: React.ReactElement, 
    userIsOwner?: boolean,
    handleSelect: (a: TPost) => void;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
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

    const handleSelectTrack = (a: TPost) => {
        ref.current && ref.current.close();
        handleSelect(a);
    }


    const handleSearch = () => {
        inputRef.current && inputRef.current.value.length &&
        searchTracksByTitle({
            variables: {
                input: {
                    userId: userIsOwner != undefined ? user?._id as string : undefined,
                    userIsOwner: userIsOwner,
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
            <dialog ref={ref} className="modal w-full cursor-default">
                <form method="dialog" className="modal-backdrop w-[100vw]">
                    <button>close</button>
                </form>
                <div className="modal-box   text-gray-300 w-[100vw] h-fit no-scrollbar text-start flex flex-col">
                    <form method="dialog" style={{ width:"32px", position: 'absolute', right: '14px', top: '14px', marginBottom: '24px', zIndex: 10 }}>
                        {/* if there is a button in form, it will close the modal */}
                        <MainButton onClick={onClose} color="error" className="w-8 h-fit">
                            <X/>
                        </MainButton>
                    </form>
                    <h4 className="font-bold text-lg z-50 text-base-content w-48">{dictionary.modals["select-track"].selection}</h4>

                    <div className="flex min-h-full flex-1">
                        {
                            loading
                            ?
                            <div className="flex-1 min-h-full w-full flex justify-center items-start overflow-y-auto overflow-x-hidden mt-5 thin-scrollbar">
                                <div className="flex flex-row flex-wrap gap-10 w-full justify-center items-start">
                                    <PostsContainerSkeleton/>
                                </div>
                            </div>
                            :
                            <>
                                {
                                    data?.postsByTitle && data.postsByTitle.length > 0
                                    ?
                                    <div className="flex-1 min-h-full w-full flex flex-wrap gap-16 justify-center items-start overflow-y-auto overflow-x-hidden mt-5 thin-scrollbar">
                                        {
                                            data.postsByTitle.map((p, k) => {
                                                return <Post key={k} data={p as TPost} handleSelect={handleSelectTrack} dictionary={dictionary}/>
                                            })
                                        }
                                    </div>
                                    :
                                    <div className="flex-1 min-h-full w-full flex justify-center items-center overflow-y-auto overflow-x-hidden mt-5 thin-scrollbar">
                                        <InfoImage text={dictionary.modals["select-track"]["no-tracks"]} image="/assets/icons/logo_clear.png"/>
                                    </div>
                                }
                            </>
                        }
                    </div>

                    <div className="modal-action z-50"> 
                        <div className="w-full flex flex-row gap-4">
                            <input ref={inputRef} className="input input-bordered join-item w-full bg-base-300 placeholder:text-gray-200" placeholder="Track title" />
                            <MainButton
                                onClick={handleSearch}
                                color="primary"
                                className="w-[120px]"
                            >
                                <ScanSearch className="mr-1"/>
                                {dictionary.modals["select-track"].search}
                            </MainButton>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
}