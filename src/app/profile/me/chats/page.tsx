import HeroWrapper from "@/components/wrappers/hero-wrapper";
import ChatsTabsBattles from "@/components/bars/bar-tabs/bar-tabs-chats";
import Chat from "@/components/entities/chat/chat";

export default function Chats() {
    return (
        <>
            <ChatsTabsBattles activeTab={"list"}/>
            <HeroWrapper
                bgStyles={"bg-[url('/assets/bgs/newPlaylistFormBG.png')] bg-right"}
                title={"Chats"}
                description={"List of chats"}
            >
                <div className="card shadow-2xl glass w-full min-h-screen">
                    <div className="card card-body flex flex-wrap m-0 p-0 w-full gap-5 md:p-10">
                        <Chat/>
                        <Chat/>
                        <Chat/>
                    </div>
                </div>
            </HeroWrapper>
        </>
    );
}