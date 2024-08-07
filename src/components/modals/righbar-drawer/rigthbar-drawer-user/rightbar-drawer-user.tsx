import { User } from "@/utils/graphql-requests/generated/schema";
import envCfg from "@/config/env";


export default function RightbarDrawerUser({data}: {data: User}) {
    return (
        <div className="card w-80 bg-black glass shadow-2xl">
            <figure className="max-h-48">
                <img className="w-full" src={data.background?.length ? `${envCfg.serverBase}/files/${data.background}` : "/assets/bgs/profileDefaultBG.png"} alt="background"/>
            </figure>
            <div className="card-body">
                <div className="flex flex-row gap-4 items-center">
                    <img 
                        src={data.avatar.length ? `${envCfg.serverBase}/files/${data.avatar}` : '/assets/icons/logo_clear.png' }
                        alt="avatar"
                        className="w-12 rounded-full"
                    />
                    <p className="font-bold text-lg">{data.nick}</p>
                </div>
                <div className="flex flex-row gap-2 flex-wrap mt-3 font-bold">
                    <div className="badge glass bg-[#1ba39c]">{data.subscribers?.length} followers</div>
                    <div className="badge glass">{data.subscribedOn?.length} following</div>
                </div>
            </div>
            <a href={`/profile/${data._id}/1`} className="btn btn-primary glass text-white">Profile</a>
        </div>
    );
}