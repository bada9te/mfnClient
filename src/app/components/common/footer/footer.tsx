import DotPattern from "@/app/components/magicui-components/dot-pattern";
import { getDictionary } from "@/app/dictionaries/dictionaries";
import { cn } from "@/app/utils/common-functions/cn";
import Image from "next/image";
import Link from "next/link";
import ProjectLinks from "../project-links/projects-links";

export default function Footer({
    dictionary
}: {
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    return (
        <footer className="footer p-10 bg-base-300 text-neutral-content rounded-2xl shadow-2xl overflow-hidden relative">
            <DotPattern
                className={cn(
                "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                )}
            />
            <aside>
                <Image className="rounded-full z-10 w-24" src={'/assets/logo.png'} alt={"logo"} width={400} height={400} />
                <p>Music From Nothing<br/>{new Date().getFullYear()}</p>
            </aside>
            <nav>
                <h6 className="footer-title">{dictionary?.common.footer["quick-nav"]}</h6>
                <div className="flex flex-wrap gap-4 max-w-72 z-20">
                    <Link href={"/"} className="hover:text-base-content">
                        {dictionary.common.footer.home}
                    </Link>
                    <Link href={"/battles/in-progress/1"} className="hover:text-base-content">
                        {dictionary.common.footer.battles}
                    </Link>
                    <Link href={"/playlists/explore/1"} className="hover:text-base-content">
                        {dictionary.common.footer.playlists}
                    </Link>
                    <Link href={"/profile/me/upload"} className="hover:text-base-content">
                        {dictionary.common.footer["new-post"]}
                    </Link>
                    <Link href={"/support"} className="hover:text-base-content">
                        {dictionary.common.footer.support}
                    </Link>
                    <Link href={"/faq"} className="hover:text-base-content">
                        {dictionary.common.footer.faq}
                    </Link>
                </div>
            </nav> 
            <nav>
                <h6 className="footer-title z-10">{dictionary.common.footer.social}</h6>
                <ProjectLinks/>
            </nav>    

            <Image width={190} height={190} src="/assets/drawings/drawing-3.png" alt="drawing-3" className="absolute bottom-4 md:bottom-0 right-0 z-10 hidden md:block"/>  
            <Image width={130} height={130} src="/assets/figures/cube-rounded.png" alt="cube-rounded" className="rotate-12 absolute top-3 md:top-32 mix-blend-luminosity right-3 md:right-96 z-10 opacity-70"/>         
            <Image width={70} height={70} src="/assets/figures/bubble.png" alt="bubble" className="absolute top-32 mix-blend-luminosity right-3 md:left-72 z-10 opacity-70"/>
            <Image width={700} height={400} src="/assets/bgs/footer-bg-right.png" alt="footer-bg-right" className="w-80 absolute bottom-0 right-0 rounded-br-2xl z-0 blur-sm"/>
        </footer>
    );
}