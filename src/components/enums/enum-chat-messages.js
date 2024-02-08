import ChatMessageItem from "../common/chat-message-item/chat-message-item";


const EnumChatMessages = props => {
    const { messages, chatParticipants } = props;

    return (
        <>
            {
                messages.map((message, key) => {
                    return (
                        <ChatMessageItem key={key} item={message} chatParticipants={chatParticipants}/>
                    );
                })
            }
        </>
    );
}

export default EnumChatMessages;