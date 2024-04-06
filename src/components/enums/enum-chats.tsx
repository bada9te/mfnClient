import { ChatsUserRelatedByUserIdQuery } from "utils/graphql-requests/generated/schema";
import ChatItem from "../common/chat-item/chat-item";

export default function EnumChats(props: {
    chats: ChatsUserRelatedByUserIdQuery["chatsUserRelatedByUserId"];
    chatSelectionHandler: (id: string) => void;
}) {
    const { chats, chatSelectionHandler } = props;

    return (
        <>
            {
                chats?.map((chat, key) => {
                    return (
                        <ChatItem 
                            key={key} 
                            item={chat} 
                            chatSelectionHandler={() => chatSelectionHandler(chat._id)}
                        />
                    );
                })
            }
        </>
    );
}