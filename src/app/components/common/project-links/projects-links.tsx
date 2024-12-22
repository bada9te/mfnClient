import Image from "next/image";
import Link from "next/link";

export default function ProjectLinks() {
    return (
        <div className="flex flex-row flex-wrap gap-4 z-30">
            <Link href={`https://x.com/the_mfn_app`} target="_blank" className="btn btn-sm  text-base-content bg-gray-950 hover:bg-black">
                <Image src={"/assets/icons/x-logo.png"} width={20} height={20} alt="tg" className="rounded-full"/>
                Twitter
            </Link>

            <Link href={`https://www.facebook.com/profile.php?id=61568320525682`} target="_blank" className="btn btn-sm  text-base-content bg-blue-600 hover:bg-blue-800">
                <Image src={"/assets/icons/facebook-logo.png"} width={20} height={20} alt="tg" className="rounded-full"/>
                Facebook
            </Link>

        
            <Link href={`https://www.instagram.com/musicfromnothing.app`} target="_blank" className="btn btn-sm  text-base-content bg-pink-600 hover:bg-pink-800">
                <Image src={"/assets/icons/instagram-logo.png"} width={20} height={20} alt="tg" className="rounded-full"/>
                Instagram
            </Link>
        </div>
    );
}