"use client"
import { User } from "@/utils/graphql-requests/generated/schema";
import envCfg from "@/config/env";
import Image from "next/image";
import { getDictionary } from "@/dictionaries/dictionaries";
import { useEffect, useState } from "react";


export default function RightbarDrawerUser({
    data, 
    dictionary
}: {
    data: User; 
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const [avatar, setAvatar] = useState<string | null>();
    const [bg, setBg] = useState<string | null>();


    useEffect(() => {
        if (data?.avatar) {
            fetch(`/api/files?cid=${data?.avatar}`).then(async data => {
                setAvatar(await data.json())
            });
        } else {
            setAvatar('/assets/icons/logo_clear.png');
        }

        if (data?.background) {
            fetch(`/api/files?cid=${data.background}`).then(async data => {
                setBg(await data.json())
            });
        } else {
            setBg('/assets/bgs/profileDefaultBG.png');
        }
    }, []);
    return (
        <div className="card w-80 bg-base-300 glass shadow-2xl">
            <figure className="max-h-48">
                {
                    bg 
                    ?
                    <Image width={400} height={400} className="w-full" src={bg} alt="background"/>
                    :
                    <div className="h-[137px] w-full skeleton rounded-b-none"></div>
                }
            </figure>
            <div className="card-body">
                <div className="flex flex-row gap-4 items-center">
                    {
                        avatar ?
                        <Image width={200} height={200}
                            src={avatar}
                            alt="avatar"
                            className="w-12 rounded-full"
                        /> :
                        <div className="h-12 w-12 skeleton rounded-full"></div>
                    }
                    <p className="font-bold text-lg">{data.nick}</p>
                </div>
                <div className="flex flex-row gap-2 flex-wrap mt-3 font-bold">
                    <div className="badge glass bg-[#1ba39c] text-white">{data.subscribers?.length} {dictionary.modals["rightbar-drawer"]["rightbar-drawer-user"].followers}</div>
                    <div className="badge glass text-white">{data.subscribedOn?.length} {dictionary.modals["rightbar-drawer"]["rightbar-drawer-user"].following}</div>
                </div>
            </div>
            <a href={`/profile/${data._id}/1`} className="btn btn-primary glass text-white">{dictionary.modals["rightbar-drawer"]["rightbar-drawer-user"].profile}</a>
        </div>
    );
}