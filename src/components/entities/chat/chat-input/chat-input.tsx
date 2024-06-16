export default function ChatInput() {
    return (
        <div className="join w-full rounded-none">
            <input className="input input-bordered join-item w-full" placeholder="Message text"/>
            <div className="indicator">
                <button className="btn join-item btn-primary">Send</button>
            </div>
        </div>
    );
}