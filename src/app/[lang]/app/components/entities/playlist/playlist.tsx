import { revalidatePathAction } from "@/app/utils/actions/revalidation";
import InfoImage from "@/app/[lang]/app/components/common/info-image/info-image";
import SelectTrackModal from "@/app/[lang]/app/components/modals/select-track-modal";
import { Post as TPost, usePlaylistDeleteByIdMutation, usePlaylistSwicthTrackMutation } from "@/app/utils/graphql-requests/generated/schema";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import Post from "../post/post";
import { getDictionary } from "@/app/translations/dictionaries";
import { Link, Minus, NotebookTabs, Plus, Trash } from "lucide-react";

export default function Playlist(props: {
    _id: string;
    title: string;
    posts: TPost[];
    editable?: boolean;
    expanded?: boolean;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const { posts, title, _id, editable, expanded, dictionary } = props;
    const [ deletePlaylist ] = usePlaylistDeleteByIdMutation({
        variables: {
            _id
        }
    });
    const [ swicthTrack ] = usePlaylistSwicthTrackMutation();
    const { enqueueSnackbar } = useSnackbar();
    const [ isRemovingTrack, setIsRemovingTrack ] = useState(false);

    const handleSelfDelete = () => {
        enqueueSnackbar("Deleting playlist...", {autoHideDuration: 1500});
        deletePlaylist().then(_ => {
            enqueueSnackbar("Playlist deleted", {autoHideDuration: 2000, variant: 'success'});
            revalidatePathAction("/playlists/my-playlists", "page");
            revalidatePathAction("/playlists/explore", "page");
        }).catch(_ => {
            enqueueSnackbar("Playlist deletion error, pls try again later", {autoHideDuration: 3000, variant: 'error'});
        });
    }

    const handleSwitchTrack = (post: TPost) => {
        enqueueSnackbar("Processing...", {autoHideDuration: 1500});
        swicthTrack({
            variables: {
                input: {
                    trackId: post._id,
                    playlistId: _id,
                }
            }
        }).then(_ => {
            enqueueSnackbar("Done", {autoHideDuration: 2000, variant: 'success'});
            revalidatePathAction("/playlists/my-playlists", "page");
            revalidatePathAction("/playlists/explore", "page");
        }).catch(_ => {
            enqueueSnackbar("Sth went wrong, pls try again later", {autoHideDuration: 3000, variant: 'error'});
        });
    }

    const handleLinkClick = () => {
        navigator.clipboard.writeText(`${window.location.origin}/playlists/${_id}`);
        enqueueSnackbar("Link copied", {variant: 'success', autoHideDuration: 1500});
    }

    return (
        <div className="collapse collapse-plus bg-base-100 shadow-2xl">
            <input type="checkbox" name="my-accordion-3" defaultChecked={expanded}/>
            <div className="collapse-title text-xl font-medium text-start">
                <span className="flex flex-row items-center">
                    {title} 

                    
                </span>
            </div>
            <div className="collapse-content">
                <div className="divider divider-primary mb-10">
                    <div className="py-2 join join-horizontal w-full flex justify-center z-20">
                        <button className={`btn btn-sm join-item ${!editable && 'w-full'}`} onClick={handleLinkClick}>
                            <Link />
                            <span className="hidden md:block">{dictionary.entities.playlist.share}</span>
                        </button>
                        {
                            editable
                            &&
                            <>
                                <SelectTrackModal
                                    dictionary={dictionary}
                                    handleSelect={handleSwitchTrack}
                                    userIsOwner={undefined}
                                    button={
                                        <button className="btn btn-sm join-item">
                                            <Plus className="mr-1"/>
                                            <span className="hidden md:block">{dictionary.entities.playlist["add-track"]}</span>
                                        </button>
                                    }
                                />
                                <button className={`btn btn-sm join-item ${isRemovingTrack && 'btn-error'}`} onClick={() => setIsRemovingTrack(!isRemovingTrack)}>
                                    <Minus className="mr-1"/>
                                    <span className="hidden md:block">{dictionary.entities.playlist["remove-track"]}</span>
                                </button>
                                <button className="btn btn-sm btn-error join-item" onClick={handleSelfDelete}>
                                    <Trash className="mr-1"/>
                                    <span className="hidden md:block">{dictionary.entities.playlist["delete-playlist"]}</span>
                                </button>
                            </>
                        }
                    </div>
                </div>
                <div className="flex flex-wrap gap-5 justify-around mb-10 mt-5">
                    {
                        posts?.map((post, index) => (
                            !isRemovingTrack 
                            ? 
                            <Post data={post} key={index} dictionary={dictionary}/>
                            :
                            <Post data={post} key={index} handleRemove={handleSwitchTrack} dictionary={dictionary}/>
                        ))
                    }
                    {posts?.length === 0 && <InfoImage text="No tracks yet" image="/assets/icons/logo_playlist.png"/>}
                </div>
            </div>
        </div>
    );
}