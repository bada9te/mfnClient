import { User } from "@/utils/graphql-requests/generated/schema";
import envCfg from "@/config/env";
import Image from "next/image";
import { getDictionary } from "@/dictionaries/dictionaries";


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
                <Image width={400} height={400} className="w-full" src={data.background?.length ? `${envCfg.serverBase}/files/${data.background}` : "/assets/bgs/profileDefaultBG.png"} alt="background"/>
            </figure>
            <div className="card-body">
                <div className="flex flex-row gap-4 items-center">
                    <Image width={200} height={200}
                        src={data.avatar.length ? `${envCfg.serverFilesEndpoint}/images/${data.avatar}` : '/assets/icons/logo_clear.png' }
                        alt="avatar"
                        className="w-12 rounded-full"
                    />
                    <p className="font-bold text-lg">{data.nick}</p>
                </div>
                <div className="flex flex-row gap-2 flex-wrap mt-3 font-bold">
                    <div className="badge glass bg-[#1ba39c]">{data.subscribers?.length} {dictionary.modals["rightbar-drawer"]["rightbar-drawer-user"].followers}</div>
                    <div className="badge glass">{data.subscribedOn?.length} {dictionary.modals["rightbar-drawer"]["rightbar-drawer-user"].following}</div>
                </div>
            </div>
            <a href={`/profile/${data._id}/1`} className="btn btn-primary glass text-white">{dictionary.modals["rightbar-drawer"]["rightbar-drawer-user"].profile}</a>
        </div>
    );
}