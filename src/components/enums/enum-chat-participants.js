import ChatParticipantItem from "../common/chat-participant-item/chat-participant-item";

const EnumChatParticipants = props => {
    const { participants, chatOwnerId, switchParticipants } = props;

    return (
        <>
            {
                participants.map((participant, key) => {
                    return (
                        <ChatParticipantItem 
                            key={key} 
                            item={participant} 
                            chatOwnerId={chatOwnerId}
                            switchParticipants={switchParticipants}
                        />
                    );
                })
            }
        </>
    );
}

export default EnumChatParticipants;