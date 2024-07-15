"use client"
import InfoImage from "@/components/info-image/info-image";
import {setTab} from "@/lib/redux/slices/bottom-bar";
import {useAppDispatch} from "@/lib/redux/store";
import { useUsersByNicknameLazyQuery } from "@/utils/graphql-requests/generated/schema";
import {LegacyRef, useEffect, useState} from "react";

export default function RightBarDrawer(props: {
    reference: LegacyRef<HTMLInputElement> | undefined
}) {
    const { reference } = props;
    const dispatch = useAppDispatch();
    const [ sq, setSq ] = useState("");

    const [ fetchUsers, {data, loading} ] = useUsersByNicknameLazyQuery();

    const handleOpen = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            dispatch(setTab("people"));
        } else {
            dispatch(setTab(null));
        }
    }

    useEffect(() => {
        if (sq.length > 0) {
            const timeout = setTimeout(() => {
                fetchUsers({
                    variables: {
                        nick: sq,
                    }
                });
            }, 750);
            return () => {
                clearInterval(timeout);
            }
        }
    }, [sq]);

    return (
        <div className="drawer drawer-end">
            <input ref={reference} id="my-drawer-people" type="checkbox" className="drawer-toggle" onChange={e => handleOpen(e)}/>

            <div className="drawer-side pt-16 z-10">
                <label htmlFor="my-drawer-people" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-92 md:w-[360px] min-h-full text-base-content glass bg-black">
                    {/* Sidebar content here */}
                    <label className="input input-bordered flex items-center justify-between gap-2 glass my-2">
                        <input type="text" className="w-fit placeholder:text-gray-200" placeholder="Search" onChange={e => setSq(e.target.value)} />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                        </svg>
                    </label>
                    <div className="flex flex-col w-full items-center gap-8 py-5 flex-1">
                        {
                            (() => {
                                if (!loading) {
                                    if (data?.usersByNickname && data?.usersByNickname?.length > 0) {
                                        return (
                                            <>
                                                {
                                                    data?.usersByNickname?.map((u, k) => {
                                                        return (
                                                            <p key={k}>{u._id}</p>
                                                        );
                                                    })
                                                }
                                            </>
                                        );
                                    } else {
                                        return (<InfoImage text="Search for users"/>);
                                    }
                                } else {
                                    return (
                                        <>
                                            CODE CODE CODE
                                        </>
                                    );
                                }
                            })()
                        }
                    </div>
                </ul>
            </div>
        </div>
    );
}