"use client"

import { getDictionary } from "@/dictionaries/dictionaries";
import { useAppSelector } from "@/lib/redux/store";
import { Key, Telescope } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RegisterExploreBtns({
    dictionary
}: {
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const user = useAppSelector(state => state.user.user);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return;
    }

    return (
        <div className="join join-vertical md:join-horizontal w-fit max-w-60 min-w-60 flex justify-center z-20">
            {
                !user?._id &&
                <Link href={'/login'} className="join-item btn btn-primary btn-sm glass text-white w-full">
                    <Key />
                    {dictionary.common["register-explore-btns"].register}
                </Link>
            }
            <Link href={`/feed/1`} className="join-item btn btn-primary btn-sm glass text-white w-full">
                <Telescope/>
                {dictionary.common["register-explore-btns"].explore}
            </Link>
        </div>
    );
}