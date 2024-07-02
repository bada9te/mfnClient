import CurrentTrackRightBar from "@/components/bars/current-track-rightbar/current-track-rightbar";

export default function RightbarTrack() {
    return (
        <div className="hidden xl:block">
            <div className="card bg-base-100 w-full main-layout-card rounded-none">
                <div className="overflow-y-auto p-0 pb-2 thin-scrollbar">
                    <CurrentTrackRightBar/>
                </div>
            </div>
        </div>
    );
}