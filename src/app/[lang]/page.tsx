import ProjectLinks from "@/app/[lang]/components/common/project-links/projects-links";
import RegisterExploreBtns from "@/app/[lang]/components/common/register-explore-btns/register-explore-btns";
import DotPattern from "@/app/[lang]/components/magicui-components/dot-pattern";
import Ripple from "@/app/[lang]/components/magicui-components/ripple";
import { cn } from "@/app/utils/common-functions/cn";
import { TLang } from "@/app/types/language";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/app/translations/dictionaries";
import { cardsData1, cardsData2 } from "@/app/data/landing";
import { RetroGrid } from "./components/magicui-components/retro-grid";



export const metadata: Metadata = {
    title: 'Tunes Hub',
    description: 'The music-streaming platform',
}

export default async function Page({params}: {params: {lang: TLang}}) {
    const dict = await getDictionary(params.lang);
    return (
        <>
            {/* ONE */}
            <div className="overflow-hidden flex flex-col items-center text-base-content border-none bg-base-300 rounded-2xl relative min-h-[600px] mt-4 m-2 md:mx-4">
                <RetroGrid opacity={0.3}/>
                <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
                    <Image width={200} height={200}  src={"/assets/logo.png"} alt="logo" className="rounded-full w-32 md:w-48 animate-fullSpin" style={{ boxShadow: '0px 0px 30px #1ca39f' }}/>
                    <Ripple />
                </div>
                <div className="flex flex-col justify-start items-center gap-4 h-fit z-10 mb-48 lg:mb-32 absolute bottom-0">
                    <p className="text-4xl md:text-5xl font-bold text-center flex-0 px-5 z-20">{dict.app.landing.welcome.header}</p>
                    <p className="text-xl text-center h-fit z-20">{dict.app.landing.welcome["subheader"]}</p>
                    <RegisterExploreBtns dictionary={dict.components}/>
                </div>
                <Image width={400} height={400}  
                    src="/assets/drawings/drawing-1.png" 
                    alt="drawing-1" 
                    className="w-48 lg:w-64 absolute bottom-0 right-0 z-20 rounded-2xl"
                />
                <Image width={400} height={400}  
                    src="/assets/drawings/drawing-2.png" 
                    alt="drawing-2" 
                    className="w-48 lg:w-64 absolute bottom-0 left-0 z-20 rounded-2xl"
                />
            </div>

            {/* TWO */}
            <div className="overflow-hidden flex flex-col items-center text-base-content py-10 md:py-24 border-none relative bg-base-300 rounded-2xl m-2 md:mx-4">
                <DotPattern
                    className={cn(
                    "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
                    )}
                />
                <p className="text-center pt-10 pb-3 font-bold text-4xl md:text-5xl px-5 z-20">{dict.app.landing.compose["header"]}</p>
                <p className="text-center pb-20 font-bold text-xl md:text-xl z-20 px-5">{dict.app.landing.compose["subheader"]}</p>
                <Image width={300} height={300}  src="/assets/figures/cube.png" alt="cube" className="w-48 absolute top-3 mix-blend-luminosity left-10 md:left-48 lg:left-96 z-10 opacity-70"/>
                <Image width={300} height={300}  src="/assets/figures/rhombus.png" alt="rhombus" className="w-32 rotate-12 absolute bottom-24 mix-blend-luminosity left-3 z-10 opacity-70"/>
                <Image width={300} height={300}  src="/assets/figures/pyramid.png" alt="pyramid" className="w-32 md:w-64 rotate-12 absolute bottom-0 mix-blend-luminosity left-24 z-10 opacity-70"/>
                <Image width={800} height={800}
                    src={"/assets/bgs/block-top-right-bg.png"}
                    alt="block-top-bg"
                    className="absolute top-0 right-0 w-48 md:w-[600px] z-0 rounded-tr-2xl blur-sm"
                />
                <div className="flex flex-row flex-wrap justify-center items-start gap-5 h-fit mb-48 lg:mb-56">
                    {
                        cardsData1.map((data, key) => {
                            return (
                                <div key={key} className="card animated-box overflow-hidden bg-base-100 w-80 h-fit min-h-64 md:w-96 shadow-xl rounded-2xl z-10">
                                    <div className="card-body bg-base-100 hover:bg-[#175a57] transition-all z-50 m-1 rounded-2xl ">
                                        <Image width={100} height={100}  src={data.iconUrl} alt="icon" className="rounded-full w-12 z-50"/>
                                        {/* @ts-ignore */}
                                        <h2 className="card-title mt-2">{dict.app.landing.compose.cards[data.id]?.title || ""}</h2>
                                        {/* @ts-ignore */}
                                        <p>{dict.app.landing.compose.cards[data.id]?.description || ""}</p>

                                        <div className="h-3"></div>
                                        { data.id == "start" && <ProjectLinks/> }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <Image width={400} height={400}  
                    src="/assets/drawings/drawing-4.png" 
                    alt="drawing-4" 
                    className="absolute bottom-0 w-48 lg:w-64 right-16 lg:right-28 z-10"
                />
                <Image width={800} height={800}
                    src={"/assets/bgs/block-top-right-bg.png"}
                    alt="block-top-bg"
                    className="absolute bottom-0 left-0 w-48 md:w-[600px] z-0 rotate-180 rounded-tr-2xl blur-sm"
                />
            </div>


            {/* THREE */}
            {
                /*
                    <div className="overflow-hidden flex flex-col items-center text-base-content border-none bg-base-300 rounded-2xl relative m-2 md:mx-4 p-3">
                        <MarqueeDemo dictionary={dict.app}/>
                    </div> 
                */
            }
                
            
            {/* FOUR */}
            <div className="overflow-hidden flex flex-col items-center text-base-content border-none bg-base-300 rounded-2xl relative m-2 py-32 md:py-56 md:mx-4">
                <DotPattern
                    className={cn(
                    "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
                    )}
                />
                <Image width={1920} height={600}
                    src={"/assets/bgs/block-top-bg.png"}
                    alt="block-top-bg"
                    className="absolute top-0 w-full rounded-t-2xl blur-sm rotate-180"
                />
                <p className="text-center pt-10 pb-3 font-bold text-4xl md:text-5xl z-10 px-5">{dict.app.landing.purpose.header}</p>
                <p className="text-center pb-16 font-bold text-xl md:text-xl z-10">{dict.app.landing.purpose.subheader}</p>
                <Image width={300} height={300}  src="/assets/figures/waterball.png" alt="waterball" className="w-32 absolute top-3 mix-blend-luminosity left-10 md:left-48 lg:left-96 z-0 opacity-70"/>
                <Image width={300} height={300}  src="/assets/figures/water.png" alt="water" className="z-10 w-48 absolute bottom-3 mix-blend-luminosity right-3 opacity-70"/>
                <Image width={300} height={300}  src="/assets/figures/chip.png" alt="chip" className="w-64 absolute bottom-72 mix-blend-luminosity left-5 z-0 opacity-70"/>
                <div className="flex flex-row flex-wrap justify-center items-start gap-5 h-fit z-10 mb-20">
                    {
                        cardsData2.map((data, key) => {
                            return (
                                <div key={key} className="card bg-base-100 w-80 min-h-64 md:w-96 rounded-2xl z-0 border-[#27aaa3] border-[2px] border-dashed">
                                    <div className="card-body bg-base-100 hover:bg-[#175a57] transition-all z-50 rounded-2xl ">
                                        <Image width={100} height={100}  src={data.iconUrl} alt="icon" className="rounded-full w-12 z-50"/>
                                        { /* @ts-ignore */ }
                                        <h2 className="card-title mt-2">{dict.app.landing.purpose.cards[data.id]?.title || ""}</h2>
                                        { /* @ts-ignore */ }
                                        <p>{dict.app.landing.purpose.cards[data.id]?.description || ""}</p>
                                        <div className="h-3"></div>
                                        {
                                            (() => {
                                                if (data.id == "gratitude") {
                                                    return (
                                                        <div className="flex flex-row gap-2 flex-wrap">

                                                            <Link href={`${data.telegram?.ChadCoder39}`} target="_blank" className="btn btn-sm  text-base-content bg-[#2294c5]">
                                                                <Image src={"/assets/icons/telegram-logo.png"} width={20} height={20} alt="tg" className="rounded-full"/>
                                                                python_enjoyer1
                                                            </Link>
                                                      

                                                            <Link href={`${data.github?.ChadCoder39}`} target="_blank" className="btn btn-sm  text-base-content bg-black">
                                                                <Image src={"/assets/icons/github-logo.png"} width={20} height={20} alt="tg" className="rounded-full"/>
                                                                ChadCoder39
                                                            </Link>

                                                            <Link href={`${data.telegram?.rDrayBen}`} target="_blank" className="btn btn-sm  text-base-content bg-[#2294c5]">
                                                                <Image src={"/assets/icons/telegram-logo.png"} width={20} height={20} alt="git" className="rounded-full"/>
                                                                rabotiahov
                                                            </Link>
                                                    
                                                            <Link href={`${data.github?.rDrayBen}`} target="_blank" className="btn btn-sm  text-base-content bg-black">
                                                                <Image src={"/assets/icons/github-logo.png"} width={20} height={20} alt="git" className="rounded-full"/>
                                                                rDrayBen
                                                            </Link>

                                                            <Link href={`${data.youtube?.hikaru}`} target="_blank" className="btn btn-sm  text-base-content bg-red-600">
                                                                <Image src={"/assets/icons/youtube-logo.png"} width={20} height={20} alt="yt" className="rounded-full"/>
                                                                hikaruyoshimura
                                                            </Link>

                                                            <Link href={`${data.x?.hikaru}`} target="_blank" className="btn btn-sm  text-base-content bg-black">
                                                                <Image src={"/assets/icons/x-logo.png"} width={20} height={20} alt="x" className="rounded-full"/>
                                                                HikaruYoshimura
                                                            </Link>
                                                        </div>
                                                    );
                                                }

                                                if (data.id == "about") {
                                                    return (
                                                        <div className="flex flex-row gap-2 flex-wrap">
                                                            <Link href={`${data.telegram?.bada9te}`} target="_blank" className="btn  btn-sm  text-base-content bg-[#2294c5] hover:bg-[#1f5b75]">
                                                                <Image src={"/assets/icons/telegram-logo.png"} width={20} height={20} alt="tg" className="rounded-full"/>
                                                                bada9te
                                                            </Link>


                                                            <Link href={`${data.github?.bada9te}`} target="_blank" className="btn  btn-sm  text-base-content bg-black">
                                                                <Image src={"/assets/icons/github-logo.png"} width={20} height={20} alt="tg" className="rounded-full"/>
                                                                bada9te
                                                            </Link>

                                                            <Link href={`${data.instagram?.bada9te}`} target="_blank" className="btn  btn-sm  text-base-content bg-pink-600">
                                                                <Image src={"/assets/icons/instagram-logo.png"} width={20} height={20} alt="tg" className="rounded-full"/>
                                                                bada9te
                                                            </Link>
                                                        </div>
                                                    );
                                                }
                                            })()
                                        }
                                    </div>

                                </div>
                            );
                        })
                    }
                </div>
                <Image width={1920} height={600}
                    src={"/assets/bgs/block-top-bg.png"}
                    alt="block-top-bg"
                    className="absolute bottom-0 w-full z-0 rounded-t-2xl blur-sm"
                />
            </div>


            {/* FIVE */}
            <div className="overflow-hidden flex flex-col items-center text-base-content border-none bg-base-300 rounded-2xl relative m-2 md:mx-4">
                <Image src={"/assets/bgs/people2.png"} alt="people" width={1920} height={640} className="rounded-2xl shadow-2xl"/>
            </div>
            
        </>
    );
}