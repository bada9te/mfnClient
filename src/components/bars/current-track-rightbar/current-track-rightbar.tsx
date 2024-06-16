import CurrentTrackOwner from "@/components/bars/current-track-rightbar/current-track-owner/current-track-owner";
import Post from "@/components/entities/post/post";

export default function CurrentTrackRightBar() {
    return (
        <div className="flex flex-col gap-4 items-center">
            <Post fullWidth/>
            <CurrentTrackOwner/>
            <button className="btn btn-neutral w-full">Open profile</button>
        </div>
    );
}
