"use client"
import { User } from "@/app/utils/graphql-requests/generated/schema";
import Image from "next/image";
import { getDictionary } from "@/app/dictionaries/dictionaries";
import getIpfsUrl from "@/app/utils/common-functions/getIpfsUrl";
import Link from "next/link";
import { UserIcon } from "lucide-react";


export default function RightbarDrawerUser({
    data, 
    dictionary
}: {
    data: User; 
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    return (
        <div className="card w-80 bg-base-100 shadow-2xl p-2">
            {
                /*
                <figure className="max-h-48">
                    <Image width={400} height={400} className="w-full max-h-[140px]" src={data.background ? getIpfsUrl(data.background) : '/assets/bgs/clear.png'} alt="background"/>
                </figure>
                */
            }
            <div className="card-body">
                <div className="flex flex-row gap-4 items-center">
                    <Image width={200} height={200}
                        src={data.avatar ? getIpfsUrl(data.avatar) : '/assets/bgs/clear.png'}
                        alt="avatar"
                        className="w-12 rounded-full"
                    /> 
                    <p className="font-bold text-lg">{data.nick}</p>
                </div>
                <div className="flex flex-row gap-2 flex-wrap mt-3 font-bold">
                    <div className="badge  bg-[#1ba39c] text-base-content">{data.subscribers?.length} {dictionary.modals["rightbar-drawer"]["rightbar-drawer-user"].followers}</div>
                    <div className="badge  text-base-content">{data.subscribedOn?.length} {dictionary.modals["rightbar-drawer"]["rightbar-drawer-user"].following}</div>
                </div>
            </div>
            <Link href={`/profile/${data._id}/1`} className="btn btn-sm w-full shadow-lg text-base-content">
                <UserIcon/>
                {dictionary.modals["rightbar-drawer"]["rightbar-drawer-user"].profile}
            </Link>
        </div>
    );
}