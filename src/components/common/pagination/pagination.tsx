"use client"
import React, {useCallback, useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";

export default function Pagination(props: {
    page: number;
    maxPage: number;
}) {
    const { page, maxPage } = props;
    const router = useRouter();
    const pathname = usePathname();

    const extractPathWithoutPageIndex = useCallback(() => {
        return pathname.substring(0, pathname.lastIndexOf('/') + 1)
    }, [pathname]);

    const handleClick = (payload: number) => {
        let newPath = pathname;
        let newPage = Number(page) + payload;
        if (newPage <= 0) {
            newPage = 1;
        }
        newPath = extractPathWithoutPageIndex() + newPage;
        router.replace(newPath);
    }

    // if page == 0 redirect to 1st page (1)
    useEffect(() => {
        if (+page === 0) {
            router.replace(extractPathWithoutPageIndex() + 1)
        }
    }, [page, extractPathWithoutPageIndex, router]);

    return (
        <div className="join w-full flex justify-center">
            <button 
                className="join-item btn btn-primary glass bg-base-300 text-white" 
                disabled={+page === 1} 
                onClick={() => handleClick(-1)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                    <path fillRule="evenodd" d="M3.22 7.595a.75.75 0 0 0 0 1.06l3.25 3.25a.75.75 0 0 0 1.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 0 0-1.06-1.06l-3.25 3.25Zm8.25-3.25-3.25 3.25a.75.75 0 0 0 0 1.06l3.25 3.25a.75.75 0 1 0 1.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 0 0-1.06-1.06Z" clipRule="evenodd" />
                </svg>
            </button>
            <button className="join-item btn btn-primary glass bg-base-300 text-white px-5">{page}</button>
            <button 
                className="join-item btn btn-primary glass bg-base-300 text-white disabled:opacity-95" 
                disabled={page > maxPage} 
                onClick={() => handleClick(1)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                    <path fillRule="evenodd" d="M12.78 7.595a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06l2.72-2.72-2.72-2.72a.75.75 0 0 1 1.06-1.06l3.25 3.25Zm-8.25-3.25 3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06l2.72-2.72-2.72-2.72a.75.75 0 0 1 1.06-1.06Z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
}