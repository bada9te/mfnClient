import ChatItem from "../common/chat-item/chat-item";


const EnumChats = props => {
    const {chats, selectChat} = props;

    return (
        <>
            {
                chats.map((item, key) => {
                    return (
                        <ChatItem
                            key={key}
                            id={item._id}
                            heading={item.title}
                            placeholder={item?.messages?.length > 0 ? item?.messages[item?.messages?.length - 1].text : "No messages yet"}
                            image="https://www.codeur.com/tuto/wp-content/uploads/2020/12/centre-img-1-950x500.jpg"
                            selectChat={selectChat}
                        />
                    )
                })
            }
        </>
    );
}

export default EnumChats;