import ChatParticipantItem from "../common/chat-participant-item/chat-participant-item";

const EnumChatParticipants = props => {
    const { participants, chatOwnerId } = props;

    return (
        <>
            {
                participants.map((participant, key) => {
                    return (
                        <ChatParticipantItem key={key} item={participant} chatOwnerId={chatOwnerId}/>
                    );
                })
            }
        </>
    );
}

export default EnumChatParticipants;