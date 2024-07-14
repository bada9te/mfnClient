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
        <div className="m-0 md:mx-8 md:mt-8 card w-full max-h-screen bg-black text-white rounded-none md:rounded-2xl shadow-2xl glass">
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
                        <div className="badge badge-secondary glass bg-secondary">{data.user.subscribers?.length} followers</div>
                        <div className="badge badge-accent glass bg-accent">{data.user.subscribedOn?.length} following</div>
                    </h2>
                    <p className="mt-3 md:mt-0">{data.user.description}</p>
                    <div className="card-actions justify-start mt-3">
                        {
                            !isEditable
                            ?
                            <>
                                <button className="btn btn-primary w-full md:w-96 glass bg-pink-500">Subscribe</button>
                            </>
                            :
                            <>
                                <button className="btn btn-primary w-full md:w-96 glass bg-pink-500">Change avatar</button>
                                <button className="btn btn-primary w-full md:w-96 glass bg-pink-500">Change background</button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}