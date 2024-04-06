import { ChatQuery, User } from "utils/graphql-requests/generated/schema";
import ChatParticipantItem from "../common/chat-participant-item/chat-participant-item";

export default function EnumChatParticipants(props: {
    participants: ChatQuery["chat"]["participants"];
    chatOwnerId: string;
    switchParticipants: (participants: { _id: string; __typename: string; }[]) => void
}) {
    const { participants, chatOwnerId, switchParticipants } = props;

    return (
        <>
            {
                participants?.map((participant, key) => {
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
