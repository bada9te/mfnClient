"use client"
import React, { useRef, useState } from "react";
import { getDictionary } from "@/dictionaries/dictionaries";
import MainButton from "../common/main-button/main-button";
import { ChevronLeft, ChevronRight, PlusIcon, X } from "lucide-react";
import { useAppSelector } from "@/lib/redux/store";
import {  usePlaylistsByOwnerIdLazyQuery } from "@/utils/graphql-requests/generated/schema";
import getTimeSince from "@/utils/common-functions/getTimeSince";
import Link from "next/link";

const LIMIT = 6;

export default function AddToPlaylistModal({
    button, 
    dictionary,
    postId,
}: {
    button: React.ReactElement; 
    postId: string;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"];
}) {
    const ref = useRef<HTMLDialogElement | null>(null);
    const user = useAppSelector(state => state.user.user);
    const [page, setPage] = useState(1);
    const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);

    const [getPlaylistsByOwner, { data, loading }] = usePlaylistsByOwnerIdLazyQuery();


    const handleOpen = () => {
        ref.current && ref.current.showModal();
        getPlaylistsByOwner({
            variables: {
                owner: user._id,
                offset: (page - 1) * LIMIT,
                limit: LIMIT,
            }
        });
    }

    const onClose = () => {
        ref.current && ref.current.close();
    }

    const handlePageChange = (newPage: number) => {
        if (newPage > 0) {
            setPage(newPage);
            getPlaylistsByOwner({
                variables: {
                    owner: user._id,
                    offset: (newPage - 1) * LIMIT,
                    limit: LIMIT,
                }
            });
        }
    }

    const handlePlaylistSelect = (e: React.ChangeEvent<HTMLInputElement>, playlistId: string) => {
        if (e.target.checked) {
            setSelectedPlaylists([...selectedPlaylists, playlistId]);
        } else {
            setSelectedPlaylists(selectedPlaylists.filter(i => i !== playlistId));
        }
    }
    
    return (
        <>
            {React.cloneElement(button, {
                onClick: handleOpen
            })}
            <dialog ref={ref} className="modal w-full cursor-default">
                <form method="dialog" className="modal-backdrop w-[100vw]">
                    <button onClick={onClose}>close</button>
                </form>
                <div className="modal-box text-gray-300 max-w-[350px] w-[100vw] h-fit md:max-w-[600px] md:w-[600px] no-scrollbar text-start flex flex-col glass">
                    <form method="dialog" style={{ width:"32px", position: 'absolute', right: '14px', top: '14px' }}>
                        {/* if there is a button in form, it will close the modal */}
                        <MainButton handler={onClose} color="error" width="25px" height="25px" padding="1">
                            <X/>
                        </MainButton>
                    </form>

                    <h4 className="font-bold text-lg">Add to playlist</h4>

                    <div className="overflow-auto max-h-[300px] thin-scrollbar bg-base-300 rounded-xl mt-7">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Switch in</th>
                                    <th>Title</th>
                                    <th>Amount</th>
                                    <th>Since creation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row x */}
                                {
                                    data?.playlistsByOwnerId.count 
                                    &&
                                    data?.playlistsByOwnerId.playlists?.map((i, key) => {
                                        return (
                                            <tr key={key}>
                                                <th>
                                                    <label>
                                                        <input 
                                                            type="checkbox" 
                                                            className="checkbox checkbox-sm" 
                                                            onChange={(e) => handlePlaylistSelect(e, i._id)}
                                                            checked={selectedPlaylists.includes(i._id)}
                                                            readOnly
                                                        />
                                                    </label>
                                                </th>
                                                <td>{i.title}</td>
                                                <td>{i.tracks?.length || 0}</td>
                                                <td>{getTimeSince(new Date(+i.createdAt))}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>

                        <div className="flex flex-row gap-1 text-lg p-3 items-center justify-center">
                            <ChevronLeft className="cursor-pointer" onClick={() => handlePageChange(page - 1)} />
                            {page}/{data?.playlistsByOwnerId ? (Math.ceil(data.playlistsByOwnerId.count / LIMIT)) : 1}
                            <ChevronRight className="cursor-pointer" onClick={() => handlePageChange(page + 1)} />
                        </div>
                    </div>

                    <div className="modal-action z-50"> 
                        <MainButton
                            handler={onClose}
                            color="primary"
                        >
                            <PlusIcon className="mr-1"/>
                            Add to {selectedPlaylists.length} playlists
                        </MainButton>
                    </div>
                </div>

            </dialog>
        </>
    );
}


// <Link href={"/playlists/create"}>Create new</Link>