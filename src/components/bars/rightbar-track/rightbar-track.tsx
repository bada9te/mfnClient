import CurrentTrackRightBar from "@/components/bars/current-track-rightbar/current-track-rightbar";
import {useAppDispatch} from "@/lib/redux/store";
import {setPost} from "@/lib/redux/slices/player";

export default function RightbarTrack() {
    const dispatch = useAppDispatch();

    const handleCloseRightbar = () => {
        dispatch(setPost(null));
    }

    return (
        <div className={`hidden xl:block col-auto max-w-80`}>
            <div className="card bg-base-100 w-full main-layout-card rounded-none">
                <div className="overflow-y-auto p-0 pb-2 thin-scrollbar">
                    <div className="h-[80px] flex justify-between items-center text-white px-5">
                        <p className="font-bold text-xl">In player:</p>
                        <button className="btn btn-sm btn-circle btn-ghost" onClick={handleCloseRightbar}>✕</button>
                    </div>
                    <CurrentTrackRightBar/>
                </div>
            </div>
        </div>
    );
}