"use client"
import {useAppDispatch, useAppSelector} from "@/lib/redux/store";
import {setTab} from "@/lib/redux/slices/bottom-bar";
import React, {LegacyRef, useEffect, useState} from "react";
import { usePostsByTitleLazyQuery, Post as TPost } from "@/utils/graphql-requests/generated/schema";
import Post from "@/components/entities/post/post";
import InfoImage from "@/components/common/info-image/info-image";
import PostSkeleton from "@/components/entities/post/post-skeleton";
import { getDictionary } from "@/dictionaries/dictionaries";
import { CircleX, Search } from "lucide-react";

export default function LeftBarDrawer(props: {
    reference: LegacyRef<HTMLInputElement> | undefined;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const { reference, dictionary } = props;
    const stateTab = useAppSelector(state => state.bottomBar.tab)
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
            <div className="drawer-side py-16 md:pb-16 md:pt-0 z-30 no-scrollbar">
                
                <label htmlFor="my-drawer-tracks" aria-label="close sidebar" className="drawer-overlay"></label>

                <ul className="menu p-4 w-92 text-base-content bg-base-300 h-max min-h-full relative"
                    style={{ backgroundSize: '400px 935px' }}
                >
                    {/* Sidebar content here */}
                    <label className="input input-bordered flex items-center justify-between gap-2 my-2 bg-base-300">
                        <input type="text" className="w-fit placeholder:text-gray-200 text-white" placeholder={dictionary?.modals?.["leftbar-drawer"]?.search} onChange={e => setSq(e.target.value)}/>
                        <Search />
                    </label>

                    <div className="no-scrollbar flex flex-col w-full items-center gap-8 py-5 flex-1 min-w-80 max-h-[calc(100vh-220px)] lg:max-h-[calc(100vh-160px)] overflow-y-scroll">
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
                                        return (
                                            <InfoImage text={props.dictionary?.modals["leftbar-drawer"]["info-image"]} image="/assets/icons/logo_clear.png"/>
                                        );
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