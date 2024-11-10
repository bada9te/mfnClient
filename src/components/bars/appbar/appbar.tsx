import Image from "next/image";
import Link from "next/link";
import ProfileButton from "@/components/common/profile-button/profile-button";
import { getDictionary } from "@/dictionaries/dictionaries";
import { ChartBarStacked, Earth, ListMusic, Menu, Swords } from "lucide-react";

export default function AppBar({
    dictionary
}: {
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    //console.log(dictionary)
    return (
        <div className="navbar fixed top-0 z-50 glass bg-[#1ba39c] row-auto bg-opacity-50">
            <div className="navbar-start">
                <div className="dropdown max-h-screen block lg:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost glass mr-1">
                        <Menu/>
                    </div>
                    <ul tabIndex={0}
                        className="glass bg-base-300 menu menu-sm dropdown-content max-h-[500px] overflow-y-auto thin-scrollbar mt-3 z-[1] p-2 shadow rounded-box w-52 flex flex-col flex-nowrap">
                        <li><Link href={"/feed/1"}>
                            <Earth/>
                            {dictionary?.bars.appbar.feed}
                        </Link></li>
                        <li>
                            <a>
                                <Swords/>
                                {dictionary?.bars.appbar.battles}
                            </a>
                            <ul className="p-2">
                                <li><Link href={"/battles/in-progress/1"}>{dictionary?.bars.appbar["in-progress"]}</Link></li>
                                <li><Link href={"/battles/finished/1"}>{dictionary?.bars.appbar.finished}</Link></li>
                                <li><Link href={"/battles/create"}>{dictionary?.bars.appbar["create-new"]}</Link></li>
                            </ul>
                        </li>
                        <li>
                            <a>
                                <ListMusic/>
                                {dictionary?.bars.appbar.playlists}
                            </a>
                            <ul className="p-2">
                                <li><Link href={"/playlists/explore/1"}>{dictionary?.bars.appbar.explore}</Link></li>
                                <li><Link href={"/playlists/my-playlists/1"}>{dictionary?.bars.appbar["my-playlists"]}</Link></li>
                                <li><Link href={"/playlists/create"}>{dictionary?.bars.appbar["create-new"]}</Link></li>
                            </ul>
                        </li>
                        <li>
                            <a>
                                <ChartBarStacked/>
                                {dictionary?.bars.appbar.categories}
                            </a>
                            <ul className="p-2">
                                <li><Link href={"/categories/country/1"}>Country</Link></li>
                                <li><Link href={"/categories/pop/1"}>Pop</Link></li>
                                <li><Link href={"/categories/classical/1"}>Classical</Link></li>
                                <li><Link href={"/categories/funk/1"}>Funk</Link></li>
                                <li><Link href={"/categories/soul/1"}>Soul</Link></li>
                                <li><Link href={"/categories/hip-hop/1"}>Hip hop</Link></li>
                                <li><Link href={"/categories/rock/1"}>Rock</Link></li>
                                <li><Link href={"/categories/electronic/1"}>Electronic</Link></li>
                                <li><Link href={"/categories/latin/1"}>Latin</Link></li>
                                <li><Link href={"/categories/jazz/1"}>Jazz</Link></li>
                                <li><Link href={"/categories/blues/1"}>Blues</Link></li>
                                <li><Link href={"/categories/folk/1"}>Folk</Link></li>
                                <li><Link href={"/categories/metal/1"}>Metal</Link></li>
                                <li><Link href={"/categories/reggae/1"}>Reggae</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <Link className="btn btn-ghost text-xl" href={'/'}>
                    <Image src={'/assets/logo.png'} alt={'logo'} width={40} height={40}
                           className="rounded-full hidden lg:block"/>
                    <span className="hidden md:flex">Music From Nothing</span>
                    <span className="flex md:hidden">MFN</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 bg-base-300 rounded-xl">
                    <li><Link href={"/feed/1"}>
                        <Earth/>
                        {dictionary?.bars.appbar.feed}
                    </Link></li>
                    <li>
                        <details>
                            <summary>
                                <Swords/>
                                {dictionary?.bars.appbar.battles}
                            </summary>
                            <ul className="p-2 glass bg-base-300">
                                <li><Link href={"/battles/in-progress/1"}>{dictionary?.bars.appbar["in-progress"]}</Link></li>
                                <li><Link href={"/battles/finished/1"}>{dictionary?.bars.appbar.finished}</Link></li>
                                <li><Link href={"/battles/create"}>{dictionary?.bars.appbar["create-new"]}</Link></li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary>
                                <ListMusic/>
                                {dictionary?.bars.appbar.playlists}
                            </summary>
                            <ul className="p-2 glass bg-base-300">
                                <li><Link href={"/playlists/explore/1"}>{dictionary?.bars.appbar.explore}</Link></li>
                                <li><Link href={"/playlists/my-playlists/1"}>{dictionary?.bars.appbar["my-playlists"]}</Link></li>
                                <li><Link href={"/playlists/create"}>{dictionary?.bars.appbar["create-new"]}</Link></li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary>
                                <ChartBarStacked/>
                                {dictionary?.bars.appbar.categories}
                            </summary>
                            <ul className="p-2 glass bg-base-300">
                                <li><Link href={"/categories/country/1"}>Country</Link></li>
                                <li><Link href={"/categories/pop/1"}>Pop</Link></li>
                                <li><Link href={"/categories/classical/1"}>Classical</Link></li>
                                <li><Link href={"/categories/funk/1"}>Funk</Link></li>
                                <li><Link href={"/categories/soul/1"}>Soul</Link></li>
                                <li><Link href={"/categories/hip-hop/1"}>Hip hop</Link></li>
                                <li><Link href={"/categories/rock/1"}>Rock</Link></li>
                                <li><Link href={"/categories/electronic/1"}>Electronic</Link></li>
                                <li><Link href={"/categories/latin/1"}>Latin</Link></li>
                                <li><Link href={"/categories/jazz/1"}>Jazz</Link></li>
                                <li><Link href={"/categories/blues/1"}>Blues</Link></li>
                                <li><Link href={"/categories/folk/1"}>Folk</Link></li>
                                <li><Link href={"/categories/metal/1"}>Metal</Link></li>
                                <li><Link href={"/categories/reggae/1"}>Reggae</Link></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <ProfileButton dictionary={dictionary}/>
            </div>
        </div>
    );
}