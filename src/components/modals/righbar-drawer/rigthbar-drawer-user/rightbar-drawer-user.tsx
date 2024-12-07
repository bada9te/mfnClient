"use client"
import { User } from "@/utils/graphql-requests/generated/schema";
import Image from "next/image";
import { getDictionary } from "@/dictionaries/dictionaries";
import getIpfsUrl from "@/utils/common-functions/getIpfsUrl";
import Link from "next/link";


export default function RightbarDrawerUser({
    data, 
    dictionary
}: {
    data: User; 
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    return (
        <div className="card w-80 bg-base-300 glass shadow-2xl">
            <figure className="max-h-48">
                <Image width={400} height={400} className="w-full" src={data.background ? getIpfsUrl(data.background) : '/assets/bgs/clear.png'} alt="background"/>
            </figure>
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
                    <div className="badge glass bg-[#1ba39c] text-white">{data.subscribers?.length} {dictionary.modals["rightbar-drawer"]["rightbar-drawer-user"].followers}</div>
                    <div className="badge glass text-white">{data.subscribedOn?.length} {dictionary.modals["rightbar-drawer"]["rightbar-drawer-user"].following}</div>
                </div>
            </div>
            <Link href={`/profile/${data._id}/1`} className="btn btn-primary glass text-white">{dictionary.modals["rightbar-drawer"]["rightbar-drawer-user"].profile}</Link>
        </div>
    );
}