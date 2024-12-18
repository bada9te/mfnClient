import Image from "next/image";
import DotPattern from "../magicui-components/dot-pattern";
import { cn } from "@/lib/utils";

export default function HeroWrapper(props: {
    children: React.ReactNode;
    title: string;
    description: string;
    disableMarginsOnMobile?: boolean;
}) {
    const { children, title, description, disableMarginsOnMobile } = props;

    return (
        <div className="w-full p-2 pt-6 md:px-4 md:pt-4">
            <div className={`hero min-h-screen md:rounded-2xl shadow-2xl text-base-content bg-base-300 relative rounded-2xl overflow-hidden`}>
                <DotPattern
                    className={cn(
                    "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
                    )}
                />
                <div className="flex w-full flex-col items-center justify-center py-10 relative">
                    <Image 
                        src="/assets/figures/pyramid.png" 
                        alt="pyramid" 
                        className="absolute top-0 left-72 lg:left-96 w-48 opacity-70 z-10"
                        width={500}
                        height={500}
                    />
                    <Image 
                        src="/assets/figures/triangle.png" 
                        alt="triangle" 
                        className="absolute top-0 right-72 lg:right-96 w-24 rotate-90 opacity-70 z-10"
                        width={500}
                        height={500}
                    />
                    <h1 className="mb-5 text-5xl font-bold text-center z-10">{title}</h1>
                    <p className="mb-5 text-center z-10 px-10 md:px-32">{description}</p>
                    <div className={`hero-content text-center w-full z-10 mt-5 ${disableMarginsOnMobile && "p-0 md:p-4"}`}>
                        {children}
                    </div>
                </div>
                <Image 
                    src="/assets/drawings/drawing-5.png" 
                    alt="drawing-2" 
                    className="w-48 md:w-64 lg:w-96 absolute bottom-0 left-0 rounded-2xl"
                    width={500}
                    height={500}
                />
                <Image
                    src="/assets/bgs/block-top-right-bg.png"
                    alt="bg-top-right"
                    className="w-[200px] md:w-[400px] absolute top-0 right-0 blur-sm"
                    width={500}
                    height={500}
                />
            </div>
        </div>
    );
}