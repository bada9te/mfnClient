import {User} from "@/utils/graphql-requests/generated/schema";
import nextConfig from "../../../../../next.config.mjs";

export default function CurrentTrackOwner({user}: {user: User}) {
    return (
        <div className="card w-full bg-base-100 shadow-xl rounded-none text-white">
            <figure className="min-h-32"><img className="w-full"
                         src={user?.background ? `${nextConfig.env?.serverFilesEndpoint}/${user.background}` : '/assets/bgs/profileDefaultBG.png'} alt="Shoes"/>
            </figure>
            <div className="card-body flex flex-col gap-3 text-center justify-center items-center">
                <div className="avatar flex justify-center">
                    <div className="w-24 mask mask-hexagon">
                        <img src={user?.avatar ? `${nextConfig.env?.serverFilesEndpoint}/${user.avatar}` : '/assets/icons/logo_clear.png'}/>
                    </div>
                </div>
                <h2 className="card-title">{user?.nick}</h2>
                <p className="mt-3 md:mt-0">{user?.description}</p>

                <div className="badge badge-secondary">{user?.subscribers?.length} followers</div>
                <div className="badge badge-accent">{user?.subscribedOn?.length} following</div>
                <button className="btn btn-primary w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path fillRule="evenodd"
                              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
                              clipRule="evenodd"/>
                    </svg>
                    Subscribe
                </button>
            </div>
        </div>
    );
}