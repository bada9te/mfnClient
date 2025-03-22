import Image from "next/image";

export default function LandingPart4() {
    return (
        <div
            className="overflow-hidden flex flex-col items-center text-base-content border-none bg-base-300 rounded-2xl relative">
            <Image src={"/assets/landing/people.png"} alt="people" width={1920} height={640}
                   className="rounded-2xl shadow-2xl"/>
        </div>
    );
}