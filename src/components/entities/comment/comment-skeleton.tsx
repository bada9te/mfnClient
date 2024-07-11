export default function CommentSkeleton() {
    return (
        <article className="card p-6 text-base rounded-lg ">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-between justify-between w-full flex-row">
                    <div className="flex flex-row items-center gap-2">
                    <div className="skeleton h-10 w-10 rounded-full"></div>
                        <div className="skeleton h-10 w-44"></div>
                    </div>
                </div>
            </footer>
            <div className="flex flex-col gap-2">
                <div className="skeleton h-5 w-96"></div>
                <div className="skeleton h-5 w-44"></div>
            </div>
            <div className="flex items-center mt-4 space-x-4">
                <div className="skeleton h-5 w-20"></div>
                <div className="skeleton h-5 w-20"></div>
                <div className="skeleton h-5 w-20"></div>
            </div>
        </article>
    );
}