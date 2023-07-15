import { memo } from "react";
import ChatParticipantItem from "../common/chat-participant-item/chat-participant-item";
import { useSelector } from "react-redux";

const EnumParticipants = props => {
    const {participants, chatOwnerId} = props;
    const locations = useSelector(state => state.base.locations);


    return (
        <>
            {
                participants.map((participant, key) => {
                    return (
                        <ChatParticipantItem
                            key={key}
                            id={participant._id}
                            avatar={`${locations?.images}/${participant.avatar}`}
                            nickname={participant.nick}
                            description={participant.description}
                            chatOwnerId={chatOwnerId}
                        />
                    );
                })
            }
        </>
    );
}

export default memo(EnumParticipants);