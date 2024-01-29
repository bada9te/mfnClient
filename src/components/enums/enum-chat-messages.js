import ChatMessageItem from "../common/chat-message-item/chat-message-item";


const EnumChatMessages = props => {
    const { messages } = props;

    return (
        <>
            {
                messages.map((message, key) => {
                    return (
                        <ChatMessageItem key={key} item={message}/>
                    );
                })
            }
        </>
    );
}

export default EnumChatMessages;