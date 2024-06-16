import ChatEditForm from "@/components/forms/chat-edit";

export default function EditChat({params}: {params: {chat: string}}) {
    return (
        <>
            <div className="card w-full bg-base-100 shadow-xl">
                <ChatEditForm/>
            </div>

        </>
    );
}