import BarTabsPlaylists from "@/components/bars/bar-tabs/bar-tabs-playlists";

export default function Playlists() {
    return (
        <div className="flex flex-wrap gap-5 justify-center">
            <BarTabsPlaylists activeTab="create"/>
            CREATE PLAYLIST FORM
        </div>
    );
}