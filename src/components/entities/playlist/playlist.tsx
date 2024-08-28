import { revalidatePathAction } from "@/actions/revalidation";
import InfoImage from "@/components/common/info-image/info-image";
import SelectTrackModal from "@/components/modals/select-track-modal";
import { Post as TPost, usePlaylistDeleteByIdMutation, usePlaylistSwicthTrackMutation } from "@/utils/graphql-requests/generated/schema";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import Post from "../post/post";
import { getDictionary } from "@/dictionaries/dictionaries";

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
        <div className="collapse collapse-plus bg-base-300 glass shadow-2xl">
            <input type="checkbox" name="my-accordion-3" defaultChecked={expanded}/>
            <div className="collapse-title text-xl font-medium text-start">
                <span className="flex flex-row items-center">
                    {title} 
                    {' '}
                    (
                        {posts?.length} 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 ml-1">
                            <path fillRule="evenodd" d="M17.721 1.599a.75.75 0 0 1 .279.583v11.29a2.25 2.25 0 0 1-1.774 2.2l-2.041.44a2.216 2.216 0 0 1-.938-4.332l2.662-.577a.75.75 0 0 0 .591-.733V6.112l-8 1.73v7.684a2.25 2.25 0 0 1-1.774 2.2l-2.042.44a2.216 2.216 0 1 1-.935-4.331l2.659-.573A.75.75 0 0 0 7 12.529V4.236a.75.75 0 0 1 .591-.733l9.5-2.054a.75.75 0 0 1 .63.15Z" clipRule="evenodd" />
                        </svg>
                    )
                </span>
            </div>
            <div className="collapse-content">
                <div className="divider divider-primary mb-10">
                    <div className="py-2 join join-horizontal w-full flex justify-center">
                        <button className={`btn btn-sm btn-primary glass join-item text-white ${!editable && 'w-full'}`} onClick={handleLinkClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                className="size-5">
                                <path
                                    d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z"/>
                                <path
                                    d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z"/>
                            </svg>
                            <span className="hidden md:block">{dictionary.entities.playlist.share}</span>
                        </button>
                        {
                            editable
                            &&
                            <>
                                <SelectTrackModal
                                    handleSelect={handleSwitchTrack}
                                    userIsOwner={false}
                                    button={
                                        <button className="btn btn-sm btn-primary glass join-item text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                                className="size-5">
                                                <path fillRule="evenodd"
                                                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
                                                    clipRule="evenodd"/>
                                            </svg>
                                            <span className="hidden md:block">{dictionary.entities.playlist["add-track"]}</span>
                                        </button>
                                    }
                                />
                                <button className={`btn btn-sm glass join-item ${isRemovingTrack ? 'btn-error bg-red-900' : 'btn-primary'} text-white`} onClick={() => setIsRemovingTrack(!isRemovingTrack)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        className="size-5">
                                        <path fillRule="evenodd"
                                            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z"
                                            clipRule="evenodd"/>
                                    </svg>
                                    <span className="hidden md:block">{dictionary.entities.playlist["remove-track"]}</span>
                                </button>
                                <button className="btn btn-sm btn-error glass join-item text-white" onClick={handleSelfDelete}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        className="size-5">
                                        <path fillRule="evenodd"
                                            d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                                            clipRule="evenodd"/>
                                    </svg>
                                    <span className="hidden md:block">{dictionary.entities.playlist["delete-playlist"]}</span>
                                </button>
                            </>
                        }
                    </div>
                </div>
                <div className="flex flex-wrap gap-5 md:gap-3 justify-around mb-10 mt-5">
                    {
                        posts?.map((post, index) => (
                            !isRemovingTrack 
                            ? 
                            <Post data={post} key={index}/>
                            :
                            <Post data={post} key={index} handleRemove={handleSwitchTrack}/>
                        ))
                    }
                    {posts?.length === 0 && <InfoImage text="No tracks yet" image="/assets/icons/logo_playlist.png"/>}
                </div>
            </div>
        </div>
    );
}