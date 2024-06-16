import ChatTreeComponent from "@/components/entities/chat/chat-tree/chat-tree";
import ChatInput from "@/components/entities/chat/chat-input/chat-input";
import ChatsTabsBattles from "@/components/bars/bar-tabs/bar-tabs-chats";

export default function ChatTree({params}: {params: {chat: string}}) {
    return (
        <>
            <ChatsTabsBattles activeTab={"chat"}/>
            <ChatTreeComponent/>
            <ChatInput/>
        </>
    );
}