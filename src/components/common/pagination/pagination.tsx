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
                «
            </button>
            <button className="join-item btn btn-primary glass bg-base-300 text-white">{page}</button>
            <button 
                className="join-item btn btn-primary glass bg-base-300 text-white disabled:opacity-95" 
                disabled={page > maxPage} 
                onClick={() => handleClick(1)}
            >
                »
            </button>
        </div>
    );
}