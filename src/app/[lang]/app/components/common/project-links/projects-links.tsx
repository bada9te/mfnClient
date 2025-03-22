import Image from "next/image";
import Link from "next/link";


export default function ProjectLinks() {
    return (
        <div className="flex flex-row flex-wrap gap-4 z-30">
            <Link
                href={`https://x.com/the_mfn_app`}
                target="_blank"
                className="avatar text-base-content bg-gray-950 hover:bg-black rounded-full grayscale hover:grayscale-0 transition-all duration-300"
            >
                <Image src={"/assets/icons/x-logo.png"} width={40} height={40} alt="tg" className="rounded-full"/>
            </Link>

            <Link
                href={`https://www.facebook.com/profile.php?id=61568320525682`}
                target="_blank"
                className="avatar bg-blue-600 hover:bg-blue-800 rounded-full grayscale hover:grayscale-0 transition-all duration-300"
            >
                <Image src={"/assets/icons/facebook-logo.png"} width={40} height={40} alt="tg" className="rounded-full"/>
            </Link>
        
            <Link
                href={`https://www.instagram.com/musicfromnothing.app`}
                target="_blank"
                className="avatar text-base-content bg-pink-600 hover:bg-pink-800 rounded-full grayscale hover:grayscale-0 transition-all duration-300"
            >
                <Image src={"/assets/icons/instagram-logo.png"} width={40} height={40} alt="tg" className="rounded-full"/>
            </Link>
        </div>
    );
}