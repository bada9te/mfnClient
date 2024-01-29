import BaseContentContainer from "../components/containers/base-content-container/base-content-container";
import ChatsContainer from "../components/containers/chats-container/chats-container";

const Chats = props => {
    return (
        <BaseContentContainer>
            <ChatsContainer/>
        </BaseContentContainer>
    );
}

export default Chats;