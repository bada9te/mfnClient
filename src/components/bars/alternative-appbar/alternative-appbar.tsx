import { Link } from "lucide-react";
import Image from "next/image";

export default function AlternativeAppbar() {
    return (
        <div className="bg-base-300 min-h-full min-w-full rounded-2xl overflow-hidden p-2 bg-opacity-80">
            <Link className="btn btn-ghost w-full h-fit text-base-content p-3" href={'/'}>
                <Image src={'/assets/logo.png'} alt={'logo'} width={400} height={400}
                    className="rounded-full w-10"/>
                <span className="hidden lg:flex text-sm">Music From Nothing</span>
            </Link>
        </div>
    );
}