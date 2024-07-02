export default function PostSkeleton(props: {
    fullWidth?: boolean;
}) {
    const { fullWidth } = props;

    return (
        <div
            className={`card w-full max-w-80 md:${fullWidth ? 'w-full' : 'w-80'} bg-base-100 shadow-xl overflow-hidden`}>
            <div
                className={`w-full flex items-center justify-center h-48 bg-gray-300 rounded dark:bg-gray-700`}>
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path
                        d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                </svg>
            </div>

            <div className="absolute m-5 flex flex-row gap-3 cursor-pointer">
                <div className="skeleton w-10 h-10 rounded-full shadow-md shrink-0"></div>
                <div className="skeleton w-32 h-10 rounded-full shadow-md shrink-0"></div>
            </div>

            <div className="card-body text-start mt-2">
                <h2 className="card-title">
                    <div className="skeleton h-5 w-32 shadow-md"></div>
                </h2>
                <div className="skeleton h-3 w-36 md:w-48 mt-2 shadow-md"></div>
                <div className="skeleton h-3 w-44 md:w-52 mt-1 shadow-md"></div>
                <div className="card-actions justify-start">
                    <div className="skeleton h-5 w-24 mt-1 shadow-md"></div>
                    <div className="skeleton h-5 w-20 mt-1 shadow-md"></div>
                </div>
            </div>
            <div className="card-actions justify-end p-2 flex flex-row">
                <div className="skeleton h-8 w-52 mt-1 rounded-xl shadow-md"></div>

                <div className="skeleton h-12 w-full rounded-xl shadow-md"></div>
            </div>
        </div>
    );
}