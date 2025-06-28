import getIpfsUrl from "@/app/utils/common-functions/getIpfsUrl";
import Image from "next/image";

export default function SearchItem() {
    return (
        
        <div className={`card w-fit bg-base-100 shadow-xl max-h-[550px] text-base-content rounded-xl relative overflow-hidden shadow-lg`}>
            <div className="h-fit p-2 flex flex-row gap-3 cursor-pointer rounded-t-xl absolute top-0">
                <div className="dropdown w-full dropdown-start text-start">
                    <button 
                        className="
                        relative
                        h-full
                        text-base-content font-bold 
                        flex items-center 
                        justify-start p-1 pr-2
                        rounded-full
                        shadow-lg bg-base-300 border-base-300 w-full"
                        role="button"
                    >
                        <div className="avatar">
                            <div className="w-7 rounded-full shadow-lg">
                                <Image alt="avatar" width={400} height={400}
                                    src={'/assets/bgs/clear.png'}/>  
                            </div>
                        </div>
                        <p className="text-base-content text-sm drop-shadow-lg pl-1 flex-1 flex flex-row items-center justify-center gap-2">
                            Nickname
                        </p>
                    </button>
                </div>
            </div>
            
            <figure><Image
                width={400} height={400}
                className="max-h-[180px] w-full min-w-80"
                src={'/assets/bgs/clear.png'}
                alt="image"/>
            </figure> 
        </div>
    );
}