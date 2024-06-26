export default function NotificationSkeleton() {
    return (
        <div className="card bg-base-100 shadow-xl w-full text-start">
            <div className="card-body">
                <div className="skeleton w-28 h-7"></div>
                <div className="skeleton w-96 h-5"></div>
                <div className="card-actions justify-end">
                    <div className="skeleton w-64 h-14"></div>
                </div>
            </div>
        </div>
    );
}