import Image from "next/image";
import Link from "next/link";
import ProfileButton from "@/components/common/profile-button/profile-button";
import { getDictionary } from "@/dictionaries/dictionaries";

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
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h8m-8 6h16"/>
                        </svg>
                    </div>
                    <ul tabIndex={0}
                        className="glass bg-base-300 menu menu-sm dropdown-content max-h-[500px] overflow-y-auto thin-scrollbar mt-3 z-[1] p-2 shadow rounded-box w-52 flex flex-col flex-nowrap">
                        <li><Link href={"/feed/1"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                 className="size-5">
                                <path
                                    d="M16.555 5.412a8.028 8.028 0 0 0-3.503-2.81 14.899 14.899 0 0 1 1.663 4.472 8.547 8.547 0 0 0 1.84-1.662ZM13.326 7.825a13.43 13.43 0 0 0-2.413-5.773 8.087 8.087 0 0 0-1.826 0 13.43 13.43 0 0 0-2.413 5.773A8.473 8.473 0 0 0 10 8.5c1.18 0 2.304-.24 3.326-.675ZM6.514 9.376A9.98 9.98 0 0 0 10 10c1.226 0 2.4-.22 3.486-.624a13.54 13.54 0 0 1-.351 3.759A13.54 13.54 0 0 1 10 13.5c-1.079 0-2.128-.127-3.134-.366a13.538 13.538 0 0 1-.352-3.758ZM5.285 7.074a14.9 14.9 0 0 1 1.663-4.471 8.028 8.028 0 0 0-3.503 2.81c.529.638 1.149 1.199 1.84 1.66ZM17.334 6.798a7.973 7.973 0 0 1 .614 4.115 13.47 13.47 0 0 1-3.178 1.72 15.093 15.093 0 0 0 .174-3.939 10.043 10.043 0 0 0 2.39-1.896ZM2.666 6.798a10.042 10.042 0 0 0 2.39 1.896 15.196 15.196 0 0 0 .174 3.94 13.472 13.472 0 0 1-3.178-1.72 7.973 7.973 0 0 1 .615-4.115ZM10 15c.898 0 1.778-.079 2.633-.23a13.473 13.473 0 0 1-1.72 3.178 8.099 8.099 0 0 1-1.826 0 13.47 13.47 0 0 1-1.72-3.178c.855.151 1.735.23 2.633.23ZM14.357 14.357a14.912 14.912 0 0 1-1.305 3.04 8.027 8.027 0 0 0 4.345-4.345c-.953.542-1.971.981-3.04 1.305ZM6.948 17.397a8.027 8.027 0 0 1-4.345-4.345c.953.542 1.971.981 3.04 1.305a14.912 14.912 0 0 0 1.305 3.04Z"/>
                            </svg>
                            {dictionary?.bars.appbar.feed}
                        </Link></li>
                        <li>
                            <a>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                     className="size-5">
                                    <path
                                        d="M6.111 11.89A5.5 5.5 0 1 1 15.501 8 .75.75 0 0 0 17 8a7 7 0 1 0-11.95 4.95.75.75 0 0 0 1.06-1.06Z"/>
                                    <path
                                        d="M8.232 6.232a2.5 2.5 0 0 0 0 3.536.75.75 0 1 1-1.06 1.06A4 4 0 1 1 14 8a.75.75 0 0 1-1.5 0 2.5 2.5 0 0 0-4.268-1.768Z"/>
                                    <path
                                        d="M10.766 7.51a.75.75 0 0 0-1.37.365l-.492 6.861a.75.75 0 0 0 1.204.65l1.043-.799.985 3.678a.75.75 0 0 0 1.45-.388l-.978-3.646 1.292.204a.75.75 0 0 0 .74-1.16l-3.874-5.764Z"/>
                                </svg>
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
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                     className="size-5">
                                    <path
                                        d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11a2.5 2.5 0 0 1 0 5h-11A2.5 2.5 0 0 1 2 4.5ZM2.75 9.083a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5H2.75ZM2.75 12.663a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5H2.75ZM2.75 16.25a.75.75 0 0 0 0 1.5h14.5a.75.75 0 1 0 0-1.5H2.75Z"/>
                                </svg>
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
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                     className="size-5">
                                    <path fillRule="evenodd"
                                          d="M4.5 2A2.5 2.5 0 0 0 2 4.5v3.879a2.5 2.5 0 0 0 .732 1.767l7.5 7.5a2.5 2.5 0 0 0 3.536 0l3.878-3.878a2.5 2.5 0 0 0 0-3.536l-7.5-7.5A2.5 2.5 0 0 0 8.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                                          clipRule="evenodd"/>
                                </svg>
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
                <ul className="menu menu-horizontal px-1">
                    <li><Link href={"/feed/1"}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             className="size-5">
                            <path
                                d="M16.555 5.412a8.028 8.028 0 0 0-3.503-2.81 14.899 14.899 0 0 1 1.663 4.472 8.547 8.547 0 0 0 1.84-1.662ZM13.326 7.825a13.43 13.43 0 0 0-2.413-5.773 8.087 8.087 0 0 0-1.826 0 13.43 13.43 0 0 0-2.413 5.773A8.473 8.473 0 0 0 10 8.5c1.18 0 2.304-.24 3.326-.675ZM6.514 9.376A9.98 9.98 0 0 0 10 10c1.226 0 2.4-.22 3.486-.624a13.54 13.54 0 0 1-.351 3.759A13.54 13.54 0 0 1 10 13.5c-1.079 0-2.128-.127-3.134-.366a13.538 13.538 0 0 1-.352-3.758ZM5.285 7.074a14.9 14.9 0 0 1 1.663-4.471 8.028 8.028 0 0 0-3.503 2.81c.529.638 1.149 1.199 1.84 1.66ZM17.334 6.798a7.973 7.973 0 0 1 .614 4.115 13.47 13.47 0 0 1-3.178 1.72 15.093 15.093 0 0 0 .174-3.939 10.043 10.043 0 0 0 2.39-1.896ZM2.666 6.798a10.042 10.042 0 0 0 2.39 1.896 15.196 15.196 0 0 0 .174 3.94 13.472 13.472 0 0 1-3.178-1.72 7.973 7.973 0 0 1 .615-4.115ZM10 15c.898 0 1.778-.079 2.633-.23a13.473 13.473 0 0 1-1.72 3.178 8.099 8.099 0 0 1-1.826 0 13.47 13.47 0 0 1-1.72-3.178c.855.151 1.735.23 2.633.23ZM14.357 14.357a14.912 14.912 0 0 1-1.305 3.04 8.027 8.027 0 0 0 4.345-4.345c-.953.542-1.971.981-3.04 1.305ZM6.948 17.397a8.027 8.027 0 0 1-4.345-4.345c.953.542 1.971.981 3.04 1.305a14.912 14.912 0 0 0 1.305 3.04Z"/>
                        </svg>
                        {dictionary?.bars.appbar.feed}
                    </Link></li>
                    <li>
                        <details>
                            <summary>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                     className="size-5">
                                    <path
                                        d="M6.111 11.89A5.5 5.5 0 1 1 15.501 8 .75.75 0 0 0 17 8a7 7 0 1 0-11.95 4.95.75.75 0 0 0 1.06-1.06Z"/>
                                    <path
                                        d="M8.232 6.232a2.5 2.5 0 0 0 0 3.536.75.75 0 1 1-1.06 1.06A4 4 0 1 1 14 8a.75.75 0 0 1-1.5 0 2.5 2.5 0 0 0-4.268-1.768Z"/>
                                    <path
                                        d="M10.766 7.51a.75.75 0 0 0-1.37.365l-.492 6.861a.75.75 0 0 0 1.204.65l1.043-.799.985 3.678a.75.75 0 0 0 1.45-.388l-.978-3.646 1.292.204a.75.75 0 0 0 .74-1.16l-3.874-5.764Z"/>
                                </svg>
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
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                     className="size-5">
                                    <path
                                        d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11a2.5 2.5 0 0 1 0 5h-11A2.5 2.5 0 0 1 2 4.5ZM2.75 9.083a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5H2.75ZM2.75 12.663a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5H2.75ZM2.75 16.25a.75.75 0 0 0 0 1.5h14.5a.75.75 0 1 0 0-1.5H2.75Z"/>
                                </svg>
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
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                     className="size-5">
                                    <path fillRule="evenodd"
                                          d="M4.5 2A2.5 2.5 0 0 0 2 4.5v3.879a2.5 2.5 0 0 0 .732 1.767l7.5 7.5a2.5 2.5 0 0 0 3.536 0l3.878-3.878a2.5 2.5 0 0 0 0-3.536l-7.5-7.5A2.5 2.5 0 0 0 8.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                                          clipRule="evenodd"/>
                                </svg>
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