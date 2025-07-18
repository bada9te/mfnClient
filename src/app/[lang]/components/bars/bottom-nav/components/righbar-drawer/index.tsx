"use client"
import InfoImage from "@/app/[lang]/components/common/info-image/info-image";
import {setTab} from "@/app/lib/redux/slices/bottom-bar";
import {useAppDispatch} from "@/app/lib/redux/store";
import { User, useUsersByNicknameLazyQuery } from "@/app/utils/graphql-requests/generated/schema";
import {LegacyRef, useEffect, useState} from "react";
import RightbarDrawerUser from "./rigthbar-drawer-user";
import RightbarDrawerUserSkeleton from "./rigthbar-drawer-user/skeleton";
import { getDictionary } from "@/app/translations/dictionaries";
import { Search } from "lucide-react";

export default function RightBarDrawer(props: {
    reference: LegacyRef<HTMLInputElement> | undefined;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
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
    }, [sq, fetchUsers]);

    return (
        <div className="drawer drawer-end">
            <input ref={reference} id="my-drawer-people" type="checkbox" className="drawer-toggle w-full" onChange={e => handleOpen(e)}/>

            <div className="drawer-side py-16 md:pb-16 md:pt-0 z-30 no-scrollbar">
                <label htmlFor="my-drawer-people" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-92 text-base-content bg-base-300 h-max min-h-full" 
                    style={{ backgroundSize: '400px 1000px', backgroundPosition: 'right' }}
                >
                    {/* Sidebar content here */}
                    <label className="input input-sm input-bordered flex items-center justify-between gap-2 bg-base-100 my-2">
                        <input type="text" className="w-fit placeholder:text-gray-200 text-base-content" placeholder={props.dictionary?.modals["rightbar-drawer"]["rightbar-drawer"].search} onChange={e => setSq(e.target.value)} />
                        <Search />
                    </label>
                    <div className="no-scrollbar flex flex-col w-full items-center gap-8 py-5 flex-1 min-w-80 max-h-[calc(100vh-220px)] lg:max-h-[calc(100vh-160px)] overflow-y-scroll">
                        {
                            (() => {
                                if (!loading) {
                                    if (data?.usersByNickname && data?.usersByNickname?.length > 0) {
                                        return (
                                            <>
                                                {
                                                    data?.usersByNickname?.map((u, k) => {
                                                        return (
                                                            <RightbarDrawerUser key={k} data={u as User} dictionary={props.dictionary}/>

                                                        );
                                                    })
                                                }
                                            </>
                                        );
                                    } else {
                                        return (<InfoImage text={props.dictionary?.modals["rightbar-drawer"]["rightbar-drawer"]["info-image"]} image="/assets/icons/logo_person.png"/>);
                                    }
                                } else {
                                    return (
                                        <>
                                            <RightbarDrawerUserSkeleton/>
                                            <RightbarDrawerUserSkeleton/>
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