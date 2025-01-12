"use client"
import ProfileButtonAlternative from "./components/profile-button-alternative";
import { getDictionary } from "@/app/translations/dictionaries";
import { ChartBarStacked, Earth, ListMusic, Swords } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import SearchItem from "./components/search-item";
import { useAppSelector } from "@/app/lib/redux/store";
import { cn } from "@/app/utils/common-functions/cn";
import { usePostsByTitleLazyQuery, useUsersByNicknameLazyQuery } from "@/app/utils/graphql-requests/generated/schema";

export default function AlternativeAppbar({
    dictionary
}: {
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const user = useAppSelector(state => state.user.user);
    const [searchTerm, setSearchTerm] = useState(""); // Add state for search term
    const inputRef = useRef<HTMLInputElement>(null); // Create a ref for the input

    const [usersQuery, { data: usersByNicknameData, loading: usersByNicknameLoading }] = useUsersByNicknameLazyQuery();
    const [postsQuery, { data: postsByTitleData, loading: postsByTitleLoading }] = usePostsByTitleLazyQuery();

    useEffect(() => {
        if (searchTerm.length) {
            usersQuery({
                variables: {
                    nick: searchTerm,
                },
            });
            postsQuery({
                variables: {
                    input: {
                        title: searchTerm,
                    },
                },
            });
        }
    }, [searchTerm]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') { // Check for Ctrl + K or Command + K
                e.preventDefault(); // Prevent default behavior
                inputRef.current?.focus(); // Focus the input
            }
        };

        window.addEventListener('keydown', handleKeyDown); // Add event listener

        return () => {
            window.removeEventListener('keydown', handleKeyDown); // Clean up event listener
        };
    }, []);

    return (
        <div className="bg-base-300 min-h-full min-w-full rounded-2xl p-2 relative flex flex-col gap-3">
            <Link className="btn bg-base-100 hover:bg-base-content hover:text-base-300 w-full h-fit text-base-content p-3" href={'/'}>
                <Image src={'/assets/logo.png'} alt={'logo'} width={400} height={400}
                    className="rounded-full w-10 shadow-xl"/>
                <span className="hidden lg:flex text-sm">Music From Nothing</span>
            </Link>

            <label className="input input-bordered flex items-center gap-2 input-sm">
                <input 
                    ref={inputRef} // Attach the ref to the input
                    type="text" 
                    className="grow" 
                    placeholder="Search" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change
                />
                <kbd className="kbd kbd-sm">⌘</kbd>
                <kbd className="text-base-content">+</kbd>
                <kbd className="kbd kbd-sm">S</kbd>
            </label>

            {searchTerm && ( // Conditionally render suggestions
                <div className="absolute top-36 left-8 w-80 z-50 p-4 rounded-2xl shadow-xl bg-base-content text-base-300 max-h-64 overflow-y-auto thin-scrollbar">
                    <ul className="flex gap-2 flex-row flex-wrap">
                        {
                            // handle loading state
                            (usersByNicknameLoading || postsByTitleLoading) &&
                            <div className="flex items-center justify-center w-full">
                                <span className="loading loading-spinner loading-md"></span>
                            </div>
                        }

                        {
                            // map USERS
                            (() => {
                                if (!postsByTitleLoading && !usersByNicknameLoading && usersByNicknameData?.usersByNickname) {
                                    return usersByNicknameData.usersByNickname.map((i, key) => {
                                        return (
                                            <li key={key} className="suggestion-item flex items-center gap-2">
                                                <button className="btn btn-neutral btn-sm">{i.nick}</button>
                                            </li>
                                        );
                                    })
                                    
                                }
                            })()
                        }

                        {
                            // map POSTS
                            (() => {
                                if (!usersByNicknameLoading && !postsByTitleLoading && postsByTitleData?.postsByTitle) {
                                    return postsByTitleData.postsByTitle.map((i, key) => {
                                        return (
                                            <li key={key} className="suggestion-item flex items-center gap-2">
                                                <button className="btn btn-neutral btn-sm">{i.title}</button>
                                            </li>
                                        );
                                    })
                                }
                            })()
                        }

                        {
                            // if nothing was found
                            (() => {
                                if (
                                    !usersByNicknameLoading && 
                                    !postsByTitleLoading &&
                                    !postsByTitleData?.postsByTitle?.length &&
                                    !usersByNicknameData?.usersByNickname.length 
                                ) {
                                    return (
                                        <div className="flex flex-row flex-wrap w-full items-center justify-center">
                                            Nothing was found
                                        </div>
                                    );
                                }
                            })()
                        }
                    </ul>
                </div>
            )}

            <div className="h-full flex flex-col justify-between">
                <ul 
                    tabIndex={0}      
                    className={
                        cn(
                            user?._id ? 'max-h-[330px]' : 'max-h-full',
                            `w-full bg-base-100 text-base-content menu menu-sm dropdown-content overflow-y-auto no-scrollbar z-[1] p-2 shadow rounded-box flex flex-col flex-nowrap`
                        )
                    }
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