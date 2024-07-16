import { User } from "@/utils/graphql-requests/generated/schema";
import config from "@/../next.config.mjs";


export default function RightbarDrawerUser({data}: {data: User}) {
    return (
        <div className="card bg-black glass">
            <div className="card-body">
                <img 
                    src={data.avatar.length ? `${config.env?.serverBase}/files/${data.avatar}` : '/assets/icons/logo_clear.png' }
                    alt="avatar"
                    className="w-12 rounded-full"
                />
            </div>
        </div>
    );
}