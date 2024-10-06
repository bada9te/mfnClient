"use client"
import {useAppDispatch} from "@/lib/redux/store";
import {setTab} from "@/lib/redux/slices/bottom-bar";
import React, {LegacyRef, useEffect, useState} from "react";
import { usePostsByTitleLazyQuery, Post as TPost } from "@/utils/graphql-requests/generated/schema";
import Post from "@/components/entities/post/post";
import InfoImage from "@/components/common/info-image/info-image";
import PostSkeleton from "@/components/entities/post/post-skeleton";
import { getDictionary } from "@/dictionaries/dictionaries";

export default function LeftBarDrawer(props: {
    reference: LegacyRef<HTMLInputElement> | undefined;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const { reference, dictionary } = props;
    const dispatch = useAppDispatch();
    const [sq, setSq] = useState("");
    const [ fetchPostsByTitle, {data, loading} ] = usePostsByTitleLazyQuery();

    const handleOpen = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            dispatch(setTab("tracks"));
        } else {
            dispatch(setTab(null));
        }
    }

    useEffect(() => {
        if (sq.length > 0) {
            const timeout = setTimeout(() => {
                fetchPostsByTitle({
                    variables: {
                        input: {
                            title: sq,
                        }
                    }
                });
            }, 750);
            return () => {
                clearInterval(timeout);
            }
        }
    }, [sq, fetchPostsByTitle]);

    return (
        <div className="drawer">
            <input ref={reference} id="my-drawer-tracks" type="checkbox" className="drawer-toggle w-full"
                   onChange={e => handleOpen(e)}/>
            <div className="drawer-side py-16 z-30 no-scrollbar">
                <label htmlFor="my-drawer-tracks" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-92 min-h-full text-base-content glass bg-base-300 bg-cover bg-opacity-20"
                    style={{ backgroundSize: '400px 935px' }}
                >
                    {/* Sidebar content here */}
                    <label className="input input-bordered flex items-center justify-between gap-2 glass my-2">
                        <input type="text" className="w-fit placeholder:text-gray-200" placeholder={dictionary?.modals?.["leftbar-drawer"]?.search} onChange={e => setSq(e.target.value)}/>
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

                    <div className="flex flex-col w-full items-center gap-8 py-5 flex-1 min-w-80 pb-16">
                        {
                            (() => {
                                if (!loading) {
                                    if (data?.postsByTitle && data?.postsByTitle?.length > 0) {
                                        return (
                                            <>
                                                {
                                                    data?.postsByTitle?.map((p, k) => {
                                                        return (
                                                            <Post key={k} data={p as TPost} dictionary={props.dictionary}/>
                                                        );
                                                    })
                                                }
                                            </>
                                        );
                                    } else {
                                        return (<InfoImage text={props.dictionary?.modals["leftbar-drawer"]["info-image"]} image="/assets/icons/logo_clear.png"/>);
                                    }
                                } else {
                                    return (
                                        <>
                                            <PostSkeleton/>
                                            <PostSkeleton/>
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