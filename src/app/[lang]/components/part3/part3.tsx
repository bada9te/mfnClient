import {TLang} from "@/app/types/language";
import DotPattern from "@/app/[lang]/app/components/magicui-components/dot-pattern";
import {cn} from "@/app/utils/common-functions/cn";
import Image from "next/image";
import {cardsData2} from "@/app/data/landing";
import Link from "next/link";
import {getDictionary} from "@/app/translations/dictionaries";

export default async function LandingPart3({params}: {params: { lang: TLang }}) {
    const dict = await getDictionary(params.lang);
    return (
        <div
            className="overflow-hidden flex flex-col items-center text-white border-none bg-base-300 relative py-32 rounded-2xl shadow-2xl"
            style={{
                backgroundImage: "url(/assets/landing/landing3.png)",
            }}
        >

            <p className="text-white text-center pt-10 pb-3 font-bold text-[100px] px-5 z-20">{dict.app.landing.purpose.header}</p>
            <p className="text-white text-center pb-20 font-bold text-[24px] z-20 px-5">{dict.app.landing.purpose.subheader}</p>

            <Image width={300} height={300} src="/assets/figures/waterball.png" alt="waterball"
                   className="w-32 absolute top-3 mix-blend-luminosity left-10 md:left-48 lg:left-96 z-0 opacity-70"/>
            <Image width={300} height={300} src="/assets/figures/water.png" alt="water"
                   className="z-10 w-48 absolute bottom-3 mix-blend-luminosity right-3 opacity-70"/>
            <Image width={300} height={300} src="/assets/figures/chip.png" alt="chip"
                   className="w-64 absolute bottom-72 mix-blend-luminosity left-5 z-0 opacity-70"/>
            <div className="flex flex-row flex-wrap justify-center items-start gap-5 h-fit z-10 mb-20">
                {
                    cardsData2.map((data, key) => {
                        return (
                            <div key={key}
                                 className="
                                 text-white card overflow-y-auto no-scrollbar w-80 min-h-80 md:w-96 shadow-xl rounded-2xl z-10
                                 bg-[#014b47] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-100
                                 ">
                                <div
                                    className="card-body hover:bg-[#175a57] transition-all z-50 rounded-2xl">
                                    <Image width={100} height={100} src={data.iconUrl} alt="icon"
                                           className="rounded-full w-12 z-50"/>
                                    { /* @ts-ignore */}
                                    <h2 className="card-title mt-2">{dict.app.landing.purpose.cards[data.id]?.title || ""}</h2>
                                    { /* @ts-ignore */}
                                    <p>{dict.app.landing.purpose.cards[data.id]?.description || ""}</p>
                                    <div className="h-3"></div>
                                    {
                                        (() => {
                                            if (data.id == "gratitude") {
                                                return (
                                                    <div className="flex flex-row gap-2 flex-wrap">

                                                        <Link href={`${data.telegram?.ChadCoder39}`} target="_blank"
                                                              className="btn btn-md text-white bg-[#2294c5] hover:bg-[#1f5b75] border-0">
                                                            <Image src={"/assets/icons/telegram-logo.png"} width={20}
                                                                   height={20} alt="tg" className="rounded-full"/>
                                                            python_enjoyer1
                                                        </Link>


                                                        <Link href={`${data.github?.ChadCoder39}`} target="_blank"
                                                              className="btn btn-md  text-white bg-black hover:bg-gray-700 border-0">
                                                            <Image src={"/assets/icons/github-logo.png"} width={20}
                                                                   height={20} alt="tg" className="rounded-full"/>
                                                            ChadCoder39
                                                        </Link>

                                                        <Link href={`${data.telegram?.rDrayBen}`} target="_blank"
                                                              className="btn btn-md text-white bg-[#2294c5] hover:bg-[#1f5b75] border-0">
                                                            <Image src={"/assets/icons/telegram-logo.png"} width={20}
                                                                   height={20} alt="git" className="rounded-full"/>
                                                            rabotiahov
                                                        </Link>

                                                        <Link href={`${data.github?.rDrayBen}`} target="_blank"
                                                              className="btn btn-md  text-white bg-black hover:bg-gray-700 border-0">
                                                            <Image src={"/assets/icons/github-logo.png"} width={20}
                                                                   height={20} alt="git" className="rounded-full"/>
                                                            rDrayBen
                                                        </Link>

                                                        <Link href={`${data.youtube?.hikaru}`} target="_blank"
                                                              className="btn btn-md text-white bg-red-600 hover:bg-red-900 border-0">
                                                            <Image src={"/assets/icons/youtube-logo.png"} width={20}
                                                                   height={20} alt="yt" className="rounded-full"/>
                                                            hikaruyoshimura
                                                        </Link>

                                                        <Link href={`${data.x?.hikaru}`} target="_blank"
                                                              className="btn btn-md  text-white bg-black hover:bg-gray-700 border-0">
                                                            <Image src={"/assets/icons/x-logo.png"} width={20}
                                                                   height={20} alt="x" className="rounded-full"/>
                                                            HikaruYoshimura
                                                        </Link>
                                                    </div>
                                                );
                                            }

                                            if (data.id == "about") {
                                                return (
                                                    <div className="flex flex-row gap-2 flex-wrap">
                                                        <Link href={`${data.telegram?.bada9te}`} target="_blank"
                                                              className="btn btn-md text-white bg-[#2294c5] hover:bg-[#1f5b75] border-0">
                                                            <Image src={"/assets/icons/telegram-logo.png"} width={20}
                                                                   height={20} alt="tg" className="rounded-full"/>
                                                            bada9te
                                                        </Link>


                                                        <Link href={`${data.github?.bada9te}`} target="_blank"
                                                              className="btn btn-md text-white bg-black hover:bg-gray-700 border-0">
                                                            <Image src={"/assets/icons/github-logo.png"} width={20}
                                                                   height={20} alt="tg" className="rounded-full"/>
                                                            bada9te
                                                        </Link>

                                                        <Link href={`${data.instagram?.bada9te}`} target="_blank"
                                                              className="btn btn-md text-white bg-pink-600 hover:bg-pink-900 border-0">
                                                            <Image src={"/assets/icons/instagram-logo.png"} width={20}
                                                                   height={20} alt="tg" className="rounded-full"/>
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
        </div>
    );
}