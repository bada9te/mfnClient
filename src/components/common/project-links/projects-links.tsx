import Image from "next/image";
import Link from "next/link";

export default function ProjectLinks() {
    return (
        <div className="flex flex-row flex-wrap gap-4 z-30">
                <Link href={``} target="_blank" className="btn btn-primary btn-sm glass text-white bg-black">
                    <Image src={"/assets/icons/x-logo.png"} width={20} height={20} alt="tg" className="rounded-full"/>
                    Twitter
                </Link>

                <Link href={``} target="_blank" className="btn btn-primary btn-sm glass text-white bg-blue-600">
                    <Image src={"/assets/icons/facebook-logo.png"} width={20} height={20} alt="tg" className="rounded-full"/>
                    Facebook
                </Link>

           
                <Link href={``} target="_blank" className="btn btn-primary btn-sm glass text-white bg-pink-600">
                    <Image src={"/assets/icons/instagram-logo.png"} width={20} height={20} alt="tg" className="rounded-full"/>
                    Instagram
                </Link>
            
        </div>
    );
}