
import RegisterExploreBtns from "@/components/common/register-explore-btns/register-explore-btns";
import DotPattern from "@/components/magicui-components/dot-pattern";
import { MarqueeDemo } from "@/components/magicui-components/landing-cards-scrolling";
import Ripple from "@/components/magicui-components/ripple";
import { getDictionary } from "@/dictionaries/dictionaries";
import { cn } from "@/lib/utils";
import { TLang } from "@/types/language";
import { Metadata } from "next";
import Image from "next/image";

const cardsData1 = [
    {
        id: 'explore',
        iconUrl: "/assets/icons/logo_clear.png",
    },
    {
        id: 'anywhere',
        iconUrl: "/assets/icons/logo_clear.png",
    },
    {
        id: 'community',
        iconUrl: "/assets/icons/logo_clear.png",
    },
    {
        id: 'start',
        iconUrl: "/assets/icons/logo_clear.png",
    },
];

const cardsData2 = [
    {
        id: "listening",
        iconUrl:  "/assets/icons/logo_clear.png"
    },
    {
        id: "musical",
        iconUrl:  "/assets/icons/logo_clear.png"
    },
    {
        id: "musician",
        iconUrl:  "/assets/icons/logo_clear.png"
    },
    {
        id: "just",
        iconUrl:  "/assets/icons/logo_clear.png"
    },
    {
        id: "about",
        iconUrl:  "/assets/icons/logo_clear.png",
        github: [{ bada9te: 'https://github.com/bada9te' }],
        instagram: [{ bada9te: 'NULL' }],
    },
    {
        id: "gratitude",
        iconUrl:  "/assets/icons/logo_clear.png",
        github: [],
        instagram: [],
    }
];

export const metadata: Metadata = {
    title: 'Music From Nothing',
    description: 'The music-streaming platform',
}

export default async function Page({params}: {params: {lang: TLang}}) {
    const dict = await getDictionary(params.lang);
    return (
        <>
            {/* ONE */}
            <div className="flex flex-col items-center text-white m-2 mt-6 md:mx-4 md:mt-4 border-none bg-base-300 rounded-2xl relative bg-opacity-80 min-h-[600px] max-w-[calc(100vw-17px)] md:max-w-[calc(100vw-32px)] lg:max-w-[calc(100vw-352px)]">
                <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
                    <Image width={200} height={200}  src={"/assets/logo.png"} alt="logo" className="rounded-full shadow-2xl w-32 md:w-48"/>
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
                    className="w-48 md:w-64 lg:w-80 absolute bottom-0 right-0 z-20 rounded-2xl"
                />
                <Image width={400} height={400}  
                    src="/assets/drawings/drawing-2.png" 
                    alt="drawing-2" 
                    className="w-48 md:w-64 lg:w-80 absolute bottom-0 left-0 z-20 rounded-2xl"
                />
                <Image width={1920} height={600}
                    src={"/assets/bgs/block-top-bg.webp"}
                    alt="block-top-bg"
                    className="absolute bottom-0 w-full rounded-t-2xl rotate-180 blur-sm"
                />
            </div>

            {/* TWO */}
            <div className="flex flex-col items-center text-white py-10 m-2 md:mx-4 md:mt-4 border-none relative bg-base-300 rounded-2xl bg-opacity-80 max-w-[calc(100vw-17px)] md:max-w-[calc(100vw-32px)] lg:max-w-[calc(100vw-352px)]">
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
                <div className="flex flex-row flex-wrap justify-center items-center gap-5 h-fit mb-48 lg:mb-56">
                    {
                        cardsData1.map((data, key) => {
                            return (
                                <div key={key} className="card animated-box overflow-hidden bg-base-300 w-80 h-64 md:w-96 shadow-xl rounded-2xl z-10 bg-opacity-40">
                                    <div className="card-body bg-base-300 hover:bg-[#1ba39c] z-50 m-1 rounded-2xl glass">
                                        <Image width={100} height={100}  src={data.iconUrl} alt="icon" className="rounded-full w-12 z-50"/>
                                        {/* @ts-ignore */}
                                        <h2 className="card-title mt-2">{dict.app.landing.compose.cards[data.id]?.title || ""}</h2>
                                        {/* @ts-ignore */}
                                        <p>{dict.app.landing.compose.cards[data.id]?.description || ""}</p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <Image width={400} height={400}  
                    src="/assets/drawings/drawing-4.png" 
                    alt="drawing-4" 
                    className="absolute bottom-0 w-52 lg:w-96 right-16 lg:right-28 z-10"
                />
                <Image width={800} height={800}
                    src={"/assets/bgs/block-top-right-bg.png"}
                    alt="block-top-bg"
                    className="absolute bottom-0 left-0 w-48 md:w-[600px] z-0 rotate-180 rounded-tr-2xl blur"
                />
            </div>


            {/* THREE */}
            <div className="py-10 m-2 md:mx-4 md:mt-4 border-none bg-base-300 rounded-2xl bg-opacity-80 max-w-[calc(100vw-17px)] md:max-w-[calc(100vw-32px)] lg:max-w-[calc(100vw-352px)]">
                <MarqueeDemo dictionary={dict.app}/>
            </div>

            
            {/* FOUR */}
            <div className="flex flex-col items-center text-white py-20 md:py-40 lg:py-56 m-2 md:mx-4 md:mt-4 border-none bg-base-300 rounded-2xl relative bg-opacity-80 max-w-[calc(100vw-17px)] md:max-w-[calc(100vw-32px)] lg:max-w-[calc(100vw-352px)]">
                <DotPattern
                    className={cn(
                    "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
                    )}
                />
                <Image width={1920} height={600}
                    src={"/assets/bgs/block-top-bg.webp"}
                    alt="block-top-bg"
                    className="absolute top-0 w-full rounded-t-2xl blur-sm"
                />
                <p className="text-center pt-10 pb-3 font-bold text-4xl md:text-5xl z-10 px-5">{dict.app.landing.purpose.header}</p>
                <p className="text-center pb-16 font-bold text-xl md:text-xl z-10">{dict.app.landing.purpose.subheader}</p>
                <Image width={300} height={300}  src="/assets/figures/waterball.png" alt="waterball" className="w-32 absolute top-3 mix-blend-luminosity left-10 md:left-48 lg:left-96 z-0 opacity-70"/>
                <Image width={300} height={300}  src="/assets/figures/water.png" alt="water" className="z-10 w-48 absolute bottom-3 mix-blend-luminosity right-3 opacity-70"/>
                <Image width={300} height={300}  src="/assets/figures/chip.png" alt="chip" className="w-64 absolute bottom-72 mix-blend-luminosity left-5 z-0 opacity-70"/>
                <div className="flex flex-row flex-wrap justify-center items-center gap-5 h-fit z-10 mb-20">
                    {
                        cardsData2.map((data, key) => {
                            return (
                                <div key={key} className="card animated-box overflow-hidden bg-base-300 w-80 min-h-64 md:w-96 shadow-xl rounded-2xl z-0 bg-opacity-40">
                                    <div className="card-body bg-base-300 hover:bg-[#1ba39c] z-50 m-1 rounded-2xl glass">
                                        <Image width={100} height={100}  src={data.iconUrl} alt="icon" className="rounded-full w-12 z-50"/>
                                        { /* @ts-ignore */ }
                                        <h2 className="card-title mt-2">{dict.app.landing.purpose.cards[data.id]?.title || ""}</h2>
                                        { /* @ts-ignore */ }
                                        <p>{dict.app.landing.purpose.cards[data.id]?.description || ""}</p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <Image width={1920} height={600}
                    src={"/assets/bgs/block-top-bg.webp"}
                    alt="block-top-bg"
                    className="absolute bottom-0 w-full rotate-180 z-0 rounded-t-2xl blur-sm"
                />
            </div>


            {/* FIVE */}
            <div className="m-2 md:mx-4 md:mt-4">
                <Image src={"/assets/bgs/people2.png"} alt="people" width={1920} height={640} className="rounded-2xl shadow-2xl"/>
            </div>
        </>
    );
}