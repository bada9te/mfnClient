import { MessageList } from "react-chat-elements";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../baseReactive";
import { ChatMessage } from "utils/graphql-requests/generated/schema";


export default function EnumChatMessages(props: {
    messages: ChatMessage[]
}) {
    const { messages } = props;
    const { user: currentUser } = useReactiveVar(baseState);

    return (
        <MessageList
            className='message-list'
            lockable={true}
            toBottomHeight={'100%'}
            /* @ts-ignore */ 
            dataSource={
                messages.map(msg => ({
                    id: msg._id,
                    position: currentUser._id === msg.owner._id ? 'right' : 'left',
                    type: 'text',
                    title: msg.owner.nick,
                    owner: msg.owner._id,
                    text: msg.text,
                    replyButton: true,
                    date: msg.createdAt,
                }))
            }
            onTitleClick={(e) => console.log(e)}
        />
    );
}