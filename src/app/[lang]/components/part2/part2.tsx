import DotPattern from "@/app/[lang]/app/components/magicui-components/dot-pattern";
import {cn} from "@/app/utils/common-functions/cn";
import Image from "next/image";
import {cardsData1} from "@/app/data/landing";
import ProjectLinks from "@/app/[lang]/app/components/common/project-links/projects-links";
import {getDictionary} from "@/app/translations/dictionaries";
import {TLang} from "@/app/types/language";

export default async function LandingPart2({params}: {params: {lang: TLang}}) {
    const dict = await getDictionary(params.lang);

    return (
        <div
            className="overflow-hidden flex flex-col items-center text-base-content py-10 md:py-24 border-none relative
            bg-cover rounded-2xl shadow-2xl"
            style={{ backgroundImage: "url(/assets/landing/landing2.png)" }}
        >
            <p className="text-white text-center pt-10 pb-3 font-bold text-[100px] px-5 z-20">{dict.app.landing.compose["header"]}</p>
            <p className="text-white text-center pb-20 font-bold text-[24px] z-20 px-5">{dict.app.landing.compose["subheader"]}</p>

            <Image width={300} height={300} src="/assets/figures/cube.png" alt="cube"
                   className="w-48 absolute top-3 mix-blend-luminosity left-10 md:left-48 lg:left-96 z-10 opacity-70"/>
            <Image width={300} height={300} src="/assets/figures/rhombus.png" alt="rhombus"
                   className="w-32 rotate-12 absolute bottom-24 mix-blend-luminosity left-3 z-10 opacity-70"/>
            <Image width={300} height={300} src="/assets/figures/pyramid.png" alt="pyramid"
                   className="w-32 md:w-64 rotate-12 absolute bottom-0 mix-blend-luminosity left-24 z-10 opacity-70"/>
            <Image width={800} height={800}
                   src={"/assets/bgs/block-top-right-bg.png"}
                   alt="block-top-bg"
                   className="absolute top-0 right-0 w-48 md:w-[600px] z-0"
            />
            <div className="flex flex-row flex-wrap justify-center items-center gap-5 h-fit mb-48 lg:mb-56 w-auto md:w-3/4">
                {
                    cardsData1.map((data, key) => {
                        return (
                            <div key={key}
                                 className="
                                 text-white card overflow-hidden w-80 h-80 md:w-96 shadow-xl rounded-2xl z-10
                                 bg-[#014b47] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-100
                                 "
                            >
                                <div
                                    className="card-body hover:bg-[#175a57] transition-all z-50 rounded-2xl ">
                                    <Image width={100} height={100} src={data.iconUrl} alt="icon"
                                           className="rounded-full w-12 z-50"/>
                                    {/* @ts-ignore */}
                                    <h2 className="card-title mt-2">{dict.app.landing.compose.cards[data.id]?.title || ""}</h2>
                                    {/* @ts-ignore */}
                                    <p>{dict.app.landing.compose.cards[data.id]?.description || ""}</p>

                                    <div className="h-3"></div>
                                    {data.id == "start" && <ProjectLinks/>}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <Image
                width={600}
                height={600}
                src="/assets/drawings/drawing-4.png"
                alt="drawing-4"
                className="
                    absolute bottom-0 w-48 lg:w-[600px] right-16 lg:right-28 z-10 transition-all duration-500
                    grayscale hover:grayscale-0 hover:filter hover:drop-shadow-[0_0_40px_#30cfc7]"
            />
            <Image width={800} height={800}
                   src={"/assets/bgs/block-top-right-bg.png"}
                   alt="block-top-bg"
                   className="absolute bottom-0 left-0 w-48 md:w-[600px] z-0 rotate-180"
            />
        </div>
    );
}