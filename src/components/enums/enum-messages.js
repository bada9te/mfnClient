import MessageItem from "../common/message-item/message-item";
import getParsedDate from "../../common-functions/get-parsed-date";
import { useSelector } from "react-redux";
 


const EnumMessages = props => {
    const {messages} = props;
    const locations = useSelector(state => state.base.locations);

    return (
        <>
            {
                messages.map((msg, key) => {
                    return (
                        <MessageItem
                            key={key}
                            owner={[
                                msg.owner._id,
                                msg.owner.nick,
                                `${locations?.images}/${msg.owner.avatar}`,
                            ]}
                            text={msg.text}
                            createdAt={getParsedDate(msg.createdAt)}
                            replies={msg.replies}
                            replyTo={msg.replyTo}
                            files={msg.files}
                        />

                        
                    );
                })
            }
        </>
    );
}

export default EnumMessages;