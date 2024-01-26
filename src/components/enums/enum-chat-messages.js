import ChatMessageItem from "../common/chat-message-item/chat-message-item";


const EnumChatMessages = props => {
    const { messages } = props;

    return (
        <>
            {
                messages.map((msg, key) => {
                    return (
                        <ChatMessageItem key={key} item={msg}/>
                    );
                })
            }
        </>
    );
}

export default EnumChatMessages;