import ChatItem from "../common/chat-item/chat-item";

const EnumChats = props => {
    const { chats, chatSelectionHandler } = props;

    return (
        <>
            {
                chats.map((chat, key) => {
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

export default EnumChats;