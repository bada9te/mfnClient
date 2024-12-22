"use client"
import React, {useCallback, useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import { ArrowBigLeft, ArrowBigRight, ChevronLeft, ChevronRight } from "lucide-react";

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
                className="join-item btn btn-sm btn-neutral bg-base-300 text-base-content" 
                disabled={+page === 1} 
                onClick={() => handleClick(-1)}
            >
                <ChevronLeft/>
            </button>
            <button className="join-item btn btn-sm btn-neutral bg-base-300 text-base-content px-5">{page}</button>
            <button 
                className="join-item btn btn-sm btn-neutral bg-base-300 text-base-content" 
                disabled={page > maxPage} 
                onClick={() => handleClick(1)}
            >
                <ChevronRight/>
            </button>
        </div>
    );
}