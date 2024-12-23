import Image from "next/image";
import DotPattern from "../magicui-components/dot-pattern";
import { cn } from "@/app/utils/common-functions/cn";

export default function HeroWrapperForm(props: {
    children: React.ReactNode;
    bgStyles: string;
    title: string;
    description: string;
    fullWidth?: boolean;
    disableMarginsOnMobile?: boolean;
}) {
    const { bgStyles, children, title, description, fullWidth, disableMarginsOnMobile } = props;

    return (
        <div className="w-full p-2 md:px-4 pt-4">
            <div className={`hero min-h-screen h-fit shadow-2xl relative rounded-2xl overflow-hidden`}>
                <DotPattern
                    className={cn(
                    "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
                    )}
                />
                <div className="hero-overlay rounded-2xl bg-base-300"></div>
                <div className="flex w-full flex-col items-center justify-center py-10 z-10 overflow-hidden">
                    <h1 className="mb-5 text-5xl font-bold text-base-content text-center z-20">{title}</h1>
                    <p className="mb-5 text-base-content text-center z-20 px-10 md:px-32">{description}</p>
                    <div className={`hero-content text-center w-full z-10 mt-5 ${disableMarginsOnMobile && "p-0 md:p-4"} overflow-hidden`}>
                        <Image 
                            src="/assets/figures/cube.png" 
                            alt="drawing-1" 
                            className="w-48 absolute top-3 right-56 lg:right-96 z-0 "
                            width={400}
                            height={400}
                        />
                        <div className={`card shrink-0 w-fit ${!fullWidth && "max-w-md"} bg-base-300`}>
                            {children}
                        </div>
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