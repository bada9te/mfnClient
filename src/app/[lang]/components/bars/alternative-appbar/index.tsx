"use client"
import ProfileButtonAlternative from "./components/profile-button-alternative";
import { getDictionary } from "@/app/dictionaries/dictionaries";
import { ChartBarStacked, Earth, ListMusic, Swords } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AlternativeAppbar({
    dictionary
}: {
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    return (
        <div className="bg-base-300 min-h-full min-w-full rounded-2xl overflow-hidden p-2 relative flex flex-col gap-3">
            <Link className="btn bg-base-100 hover:bg-base-content hover:text-base-300 w-full h-fit text-base-content p-3" href={'/'}>
                <Image src={'/assets/logo.png'} alt={'logo'} width={400} height={400}
                    className="rounded-full w-10 shadow-xl"/>
                <span className="hidden lg:flex text-sm">Music From Nothing</span>
            </Link>
            

            <div className="h-full flex flex-col justify-between">

                <ul 
                    tabIndex={0}      
                    className="w-full bg-base-100 text-base-content menu menu-sm dropdown-content max-h-[460px] overflow-y-auto no-scrollbar z-[1] p-2 shadow rounded-box flex flex-col flex-nowrap"
                >
                    <li>
                        <Link href={"/feed/1"}>
                            <Earth/>
                            {dictionary?.bars.appbar.feed}
                        </Link>
                    </li>
                    <li>
                        
                            <summary>
                                <Swords/>
                                {dictionary?.bars.appbar.battles}
                            </summary>
                            <ul className="p-3 text-base-content shadow-none">
                                <li><Link href={"/battles/in-progress/1"}>{dictionary?.bars.appbar["in-progress"]}</Link></li>
                                <li><Link href={"/battles/finished/1"}>{dictionary?.bars.appbar.finished}</Link></li>
                                <li><Link href={"/battles/create"}>{dictionary?.bars.appbar["create-new"]}</Link></li>
                            </ul>
                       
                    </li>
                    <li>
                        
                            <summary>
                                <ListMusic/>
                                {dictionary?.bars.appbar.playlists}
                            </summary>
                            <ul className="p-2 text-base-content shadow-none">
                                <li><Link href={"/playlists/explore/1"}>{dictionary?.bars.appbar.explore}</Link></li>
                                <li><Link href={"/playlists/my-playlists/1"}>{dictionary?.bars.appbar["my-playlists"]}</Link></li>
                                <li><Link href={"/playlists/create"}>{dictionary?.bars.appbar["create-new"]}</Link></li>
                            </ul>
                        
                    </li>
                    <li>
                        <details>
                            <summary>
                                <ChartBarStacked/>
                                {dictionary?.bars.appbar.categories}
                            </summary>
                            <div className="flex flex-row flex-wrap gap-2 p-3">
                                <div className="badge badge-neutral"><Link href={"/categories/country/1"}>Country</Link></div>
                                <div className="badge badge-neutral"><Link href={"/categories/pop/1"}>Pop</Link></div>
                                <div className="badge badge-neutral"><Link href={"/categories/classical/1"}>Classical</Link></div>
                                <div className="badge badge-neutral"><Link href={"/categories/funk/1"}>Funk</Link></div>
                                <div className="badge badge-neutral"><Link href={"/categories/soul/1"}>Soul</Link></div>
                                <div className="badge badge-neutral"><Link href={"/categories/hip-hop/1"}>Hip hop</Link></div>
                                <div className="badge badge-neutral"><Link href={"/categories/rock/1"}>Rock</Link></div>
                                <div className="badge badge-neutral"><Link href={"/categories/electronic/1"}>Electronic</Link></div>
                                <div className="badge badge-neutral"><Link href={"/categories/latin/1"}>Latin</Link></div>
                                <div className="badge badge-neutral"><Link href={"/categories/jazz/1"}>Jazz</Link></div>
                                <div className="badge badge-neutral"><Link href={"/categories/blues/1"}>Blues</Link></div>
                                <div className="badge badge-neutral"><Link href={"/categories/folk/1"}>Folk</Link></div>
                                <div className="badge badge-neutral"><Link href={"/categories/metal/1"}>Metal</Link></div>
                                <div className="badge badge-neutral"><Link href={"/categories/reggae/1"}>Reggae</Link></div>
                            </div>
                        </details>
                    </li>
                </ul>

                <ProfileButtonAlternative dictionary={dictionary}/>
            </div>
           
        </div>
    );
}