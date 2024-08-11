
import RegisterExploreBtns from "@/components/common/register-explore-btns/register-explore-btns";
import Image from "next/image";

const cardsData1 = [
    {
        id: 'explore',
        title: '🎵 Explore',
        description: "Explore the world of custom music, share, like and comment amazing audio posts.",
        iconUrl: "/assets/icons/logo_clear.png",
    },
    {
        id: 'anywhere',
        title: '🌐 Anywhere',
        description: "Anytime: Accessible on desktop, tablet, or mobile – fun knows no bounds.",
        iconUrl: "/assets/icons/logo_clear.png",
    },
    {
        id: 'community',
        title: '🤝 Community',
        description: "Connect, collaborate, and be inspired by like-minded creators.",
        iconUrl: "/assets/icons/logo_clear.png",
    },
    {
        id: 'start',
        title: '🚀 Lets get started',
        description: `Join "Music from Nothing" today and let the music begin!`,
        iconUrl: "/assets/icons/logo_clear.png",
    },
];

const cardsData2 = [
    {
        id: "listening",
        title: 'Listening to music',
        description: 'Listen to music and have fun!',
        iconUrl:  "/assets/icons/logo_clear.png"
    },
    {
        id: "musical",
        title: 'Musical creations sharing',
        description: 'Share users tracks inside the platform.',
        iconUrl:  "/assets/icons/logo_clear.png"
    },
    {
        id: "musician",
        title: "Musician's profiling",
        description: 'The platform provides amazing user profiles which you can customize to your own likes :)',
        iconUrl:  "/assets/icons/logo_clear.png"
    },
    {
        id: "just",
        title: 'Just for entertaiment and self-study \\*_*/',
        description: 'This platform was developed by a single person and actually in development.',
        iconUrl:  "/assets/icons/logo_clear.png"
    },
    {
        id: "about",
        title: 'About the author',
        description: 'Hi there! I am so happy to see u on my first huge web-project. I am a casual 3rd year student of National University "Zaporizhzhia Polytechnic", Zaporizhzhia, Ukraine. There is no modern web-development classes in my uni however, so I decided to do some self-education stuff.',
        iconUrl:  "/assets/icons/logo_clear.png",
        github: [{ bada9te: 'https://github.com/bada9te' }],
        instagram: [{ bada9te: 'NULL' }],
    },
    {
        id: "gratitude",
        title: 'Big gratitude',
        iconUrl:  "/assets/icons/logo_clear.png",
        description: "Want to say great thanks for translation to Deutch (Name Surname) and some technical stuff (Name Surname)",
        github: [],
        instagram: [],
    }
];


export default function Page() {
    return (
        <>
            <div className="flex flex-col items-center text-white py-10 m-2 mt-4 md:mx-4 md:mt-4 border-none bg-base-300 rounded-2xl relative bg-opacity-80 relative">
                <div className="flex flex-col justify-start items-center gap-4 h-fit z-10 mb-48 lg:mb-10 relative">
                    <Image width={200} height={200}  src={"/assets/logo.png"} alt="logo" className="rounded-full shadow-2xl w-32 md:w-48"/>
                    <p className="text-4xl md:text-5xl font-bold text-center flex-0 px-5 z-20">Welcome to Music From Nothing</p>
                    <p className="text-xl text-center h-fit z-20">The music-streaming platform</p>
                    <RegisterExploreBtns/>
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
                    src={"/assets/bgs/block-top-bg.png"}
                    alt="block-top-bg"
                    className="absolute top-0 w-full rounded-t-2xl"
                />
            </div>

            <div className="flex flex-col items-center text-white py-10 m-2 md:mx-4 md:mt-4 border-none relative bg-base-300 rounded-2xl bg-opacity-80">
                <p className="text-center pt-10 pb-3 font-bold text-4xl md:text-5xl px-5 z-20">Compose, arrange</p>
                <p className="text-center pb-20 font-bold text-xl md:text-xl z-20 px-5">and produce your unique tunes effortlessly with our web app.</p>
                <Image width={300} height={300}  src="/assets/figures/cube.svg" alt="cube" className="w-48 absolute top-3 mix-blend-luminosity left-10 md:left-48 lg:left-96 z-10 opacity-70"/>
                <Image width={300} height={300}  src="/assets/figures/rhombus.svg" alt="rhombus" className="w-32 rotate-12 absolute bottom-24 mix-blend-luminosity left-3 z-10 opacity-70"/>
                <Image width={300} height={300}  src="/assets/figures/pyramid.svg" alt="pyramid" className="w-32 md:w-64 rotate-12 absolute bottom-0 mix-blend-luminosity left-24 z-10 opacity-70"/>
                <Image width={800} height={800}
                    src={"/assets/bgs/block-top-right-bg.png"}
                    alt="block-top-bg"
                    className="absolute top-0 right-0 w-48 md:w-[600px] z-0 rounded-tr-2xl"
                />
                <div className="flex flex-row flex-wrap justify-center items-center gap-5 h-fit mb-48 lg:mb-56">
                    {
                        cardsData1.map((data, key) => {
                            return (
                                <div key={key} className="card animated-box overflow-hidden bg-base-300 w-80 h-64 md:w-96 shadow-xl rounded-2xl z-0 bg-opacity-40">
                                    <div className="card-body bg-base-300 hover:bg-[#1ba39c] z-50 m-1 rounded-2xl glass">
                                        <Image width={100} height={100}  src={data.iconUrl} alt="icon" className="rounded-full w-12 z-50"/>
                                        <h2 className="card-title mt-2">{data.title}</h2>
                                        <p>{data.description}</p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <Image width={400} height={400}  
                    src="/assets/drawings/drawing-4.png" 
                    alt="drawing-4" 
                    className="absolute bottom-0 w-52 lg:w-96 right-16 lg:right-28"
                />
                <Image width={800} height={800}
                    src={"/assets/bgs/block-top-right-bg.png"}
                    alt="block-top-bg"
                    className="absolute bottom-0 left-0 w-48 md:w-[600px] z-0 rotate-180 rounded-tr-2xl"
                />
            </div>

            <div className="flex flex-col items-center text-white py-10 m-2 md:mx-4 md:mt-4 border-none bg-base-300 rounded-2xl relative bg-opacity-80">
                <p className="text-center pt-10 pb-3 font-bold text-4xl md:text-5xl z-10 px-5">Purpose of the platform</p>
                <p className="text-center pb-16 font-bold text-xl md:text-xl z-10">and author information</p>
                <Image width={300} height={300}  src="/assets/figures/waterball.svg" alt="waterball" className="w-48 absolute top-3 mix-blend-luminosity left-10 md:left-48 lg:left-96 z-0 opacity-70"/>
                <Image width={300} height={300}  src="/assets/figures/water.svg" alt="water" className="z-10 w-48 absolute bottom-3 mix-blend-luminosity right-3 opacity-70"/>
                <Image width={300} height={300}  src="/assets/figures/chip.svg" alt="chip" className="w-64 absolute bottom-72 mix-blend-luminosity left-5 z-0 opacity-70"/>
                <div className="flex flex-row flex-wrap justify-center items-center gap-5 h-fit z-10 mb-20">
                    {
                        cardsData2.map((data, key) => {
                            return (
                                <div key={key} className="card animated-box overflow-hidden bg-base-300 w-80 min-h-64 md:w-96 shadow-xl rounded-2xl z-0 bg-opacity-40">
                                    <div className="card-body bg-base-300 hover:bg-[#1ba39c] z-50 m-1 rounded-2xl glass">
                                        <Image width={100} height={100}  src={data.iconUrl} alt="icon" className="rounded-full w-12 z-50"/>
                                        <h2 className="card-title mt-2">{data.title}</h2>
                                        <p>{data.description}</p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <Image width={1920} height={600}
                    src={"/assets/bgs/block-top-bg.png"}
                    alt="block-top-bg"
                    className="absolute bottom-0 w-full rotate-180 z-0 rounded-t-2xl"
                />
            </div>
            <div className="m-2 md:mx-4 md:mt-4">
                <Image src={"/assets/bgs/people2.png"} alt="people" width={1920} height={640} className="rounded-2xl shadow-2xl"/>
            </div>
        </>
    );
}