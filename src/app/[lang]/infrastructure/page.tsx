import HeroWrapper from "../components/wrappers/hero-wrapper";
import Image from "next/image";
import Link from "next/link";
import ChainsInfo from "./components/chains-info";

export default function Infrastructure() {
    return (
        <HeroWrapper title="Infrastructure" description="">
            <div className="flex flex-col gap-12">

                <div className="flex flex-row flex-wrap gap-5">
                    <div className="card bg-base-100 w-96 shadow-xl h-fit">
                        <figure>
                            <Image src={"/assets/bgs/nextjs.jpeg"} width={400} height={400} alt="ipfs"/>
                        </figure>
                        <div className="card-body text-start">
                            <h2 className="card-title">👀 What you see</h2>
                            <p>We use Next.js as the foundation of our project to streamline frontend development and enhance performance.</p>
                            <div className="card-actions justify-end">
                                <Link target="_blank" href={"https://nextjs.org/"} className="btn btn-sm">Read more</Link>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 w-96 shadow-xl h-fit">
                        <figure>
                            <Image src={"/assets/bgs/ipfs.jpg"} width={400} height={400} alt="ipfs"/>
                        </figure>
                        <div className="card-body text-start">
                            <h2 className="card-title">📦 Files storage</h2>
                            <p>{`We use IPFS as our primary storage provider for user-uploaded files, enabling the decentralization of our project's infrastructure.`}</p>
                            <div className="card-actions justify-end">
                                <Link target="_blank" href={"https://en.wikipedia.org/wiki/InterPlanetary_File_System"} className="btn btn-sm">Read more</Link>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 w-96 shadow-xl h-fit">
                        <figure>
                            <Image src={"/assets/bgs/evm.png"} width={400} height={400} alt="ipfs"/>
                        </figure>
                        <div className="card-body text-start">
                            <h2 className="card-title">🌐 Web-3</h2>
                            <p>We leverage EVM networks like Polygon to add interactivity to the default music player application.</p>
                            <div className="card-actions justify-end">
                                <Link target="_blank" href={"https://en.wikipedia.org/wiki/Ethereum"} className="btn btn-sm">Read more</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-3xl font-bold">Supported chains</p>
                <ChainsInfo/>
            </div>
        </HeroWrapper>
    );
}