import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer p-10 bg-base-300 text-neutral-content rounded-none md:rounded-2xl shadow-2xl overflow-hidden relative bg-opacity-80">
            <aside>
                <Image className="rounded-full" src={'/assets/logo.png'} alt={"logo"} width={100} height={100} />
                <p>Music From Nothing<br/>Providing reliable tech since 1992</p>
            </aside>
            <nav>
                <h6 className="footer-title">Quick nav</h6>
                <div className="flex flex-wrap gap-4 max-w-72">
                    <Link href={"/"} className="hover:text-white">
                        Home
                    </Link>
                    <Link href={"/battles/in-progress/1"} className="hover:text-white">
                        Battles
                    </Link>
                    <Link href={"/playlists/explore/1"} className="hover:text-white">
                        Playlists
                    </Link>
                    <Link href={"/profile/me/upload"} className="hover:text-white">
                        New post
                    </Link>
                    <Link href={"/support"} className="hover:text-white">
                        Support
                    </Link>
                    <Link href={"/faq"} className="hover:text-white">
                        FAQ
                    </Link>
                </div>
            </nav> 
            <nav>
                <h6 className="footer-title">Social</h6>
                <div className="grid grid-flow-col gap-4">
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                             className="fill-current">
                            <path
                                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                        </svg>
                    </a>
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                             className="fill-current">
                            <path
                                d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                        </svg>
                    </a>
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                             className="fill-current">
                            <path
                                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                        </svg>
                    </a>
                </div>
            </nav>    

            <Image width={190} height={190} src="/assets/drawings/drawing-3.png" alt="drawing-3" className="absolute bottom-4 md:bottom-0 right-0"/>  
            <Image width={130} height={130} src="/assets/figures/cube-rounded.svg" alt="cube-rounded" className="rotate-12 absolute top-3 md:top-32 mix-blend-luminosity right-3 md:right-96 z-0 opacity-70"/>         
            <Image width={70} height={70} src="/assets/figures/bubble.svg" alt="bubble" className="absolute top-32 mix-blend-luminosity right-3 md:left-72 z-0 opacity-70"/>
        </footer>
    );
}