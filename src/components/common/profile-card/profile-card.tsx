"use client"
import {useUserSuspenseQuery} from "@/utils/graphql-requests/generated/schema";

export default function ProfileCard(props: {
    isEditable?: boolean;
    userId: string;
}) {
    const { isEditable, userId } = props;

    const { data } = useUserSuspenseQuery({
        variables: {
            _id: userId
        }
    });

    return (
        <div className="card w-full max-h-screen bg-base-100 shadow-xl rounded-none text-black">
            <figure className="max-h-48">
                <img className="w-full" src={data.user.background.length ? data.user.background : "/assets/bgs/profileDefaultBG.png"} alt="background"/>
            </figure>
            <div className="card-body flex flex-col md:flex-row gap-5">
                <div className="avatar flex justify-center">
                    <div className="w-32 mask mask-hexagon">
                        <img src={data.user.avatar.length ? data.user.avatar : "/assets/icons/logo_clear.png"} alt="avatar" />
                    </div>
                </div>
                <div>
                    <h2 className="card-title flex flex-col md:flex-row">
                        {data.user.nick}
                        <div className="badge badge-secondary">{data.user.subscribers?.length} followers</div>
                        <div className="badge badge-accent">{data.user.subscribedOn?.length} following</div>
                    </h2>
                    <p className="mt-3 md:mt-0">{data.user.description}</p>
                    <div className="card-actions justify-start mt-3">
                        {
                            !isEditable
                            ?
                            <>
                                <button className="btn btn-primary w-full md:w-96">Subscribe</button>
                            </>
                            :
                            <>
                                <button className="btn btn-primary w-full md:w-96">Change avatar</button>
                                <button className="btn btn-primary w-full md:w-96">Change background</button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}