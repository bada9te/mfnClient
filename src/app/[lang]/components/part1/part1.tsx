"use client"
import Image from "next/image";
import Link from "next/link";
import MainButton from "@/app/[lang]/app/components/common/main-button/main-button";
import Landing1 from "../../../public/assets/bgs/landing-1.jpg";
import {useState} from "react";

const windows = [
    { left: "6%" },
    { left: "24%" },
    { left: "42%" },
    { left: "60%" },
    { left: "79%" },
    { left: "97%" },
];

export default function LandingPart1() {
    const [openAppHovered, setOpenAppHovered] = useState(false);
    const [hoverCard1, setHoveredCard1] = useState<number | undefined>(undefined);
    return (
        <div className={`w-full min-h-screen bg-cover bg-center relative rounded-2xl shadow-2xl`}>
            <div
                className="absolute top-0 left-0 h-full w-full bg-cover bg-center transition-all duration-400 rounded-2xl shadow-2xl"
                style={{
                    backgroundColor: !openAppHovered ? "#3b3e40" : "#004a46",
                    backgroundImage: "url(/assets/landing/landing-1-no-sun.png)",
                    filter: openAppHovered ? "none" : "grayscale(100%)"
                }}
            >

            </div>
            { /* HEADER */}
            <div className="flex items-center justify-between w-full gap-3 px-10 py-7 absolute top-0 lef-0">
                <Link href={"/"} className="flex flex-row items-center justify-center gap-2">
                    <Image src={"/assets/logo.png"} alt={"logo"} width={500} height={500} className="w-32"/>
                    <span className="text-2xl font-bold">Tunes Hub</span>
                </Link>

                <div className="flex flex-row gap-10">
                    <Link href={"/"} className="font-bold text-gray-400 hover:text-gray-300">New account</Link>
                    <Link href={"/"} className="font-bold text-gray-400 hover:text-gray-300">About</Link>
                    <Link href={"/"} className="font-bold text-gray-400 hover:text-gray-300">F.A.Q</Link>
                    <Link href={"/"} className="font-bold text-gray-400 hover:text-gray-300">Social media</Link>
                </div>

                <MainButton
                    color={"primary"}
                    className="w-44 h-16 text-2xl font-bold"
                    onMouseEnter={() => {
                        setOpenAppHovered(true);
                    }}
                    onMouseLeave={() => {
                        setOpenAppHovered(false);
                    }}
                >
                    Open app
                </MainButton>
            </div>

            { /* FIRST BLOCK */}
            <div className="relative flex items-center justify-center gap-5 p-10 w-full h-[600px] top-48">
                {windows.map((window, index) => (
                    <div
                        key={index}
                        className="w-56 h-[600px] bg-cover rounded-2xl border-0 border-white backdrop-blur-md blur-none transition-all duration-500"
                        style={{
                            backgroundImage: hoverCard1 == index || openAppHovered ? "url(/assets/landing/text-landing-1-filled.png)" : "url(/assets/landing/text-landing-1.png)",
                            backgroundSize: "700% auto", // Scale background across all windows
                            backgroundPosition: `${window.left} center`, // Align different sections of the image
                            backgroundClip: "padding-box",
                            filter:  hoverCard1 == index || openAppHovered ? "none" : "grayscale(100%)", // Makes the image black & white
                            boxShadow: hoverCard1 == index || openAppHovered ? "0 0 5px #34d4cd, 0 0 10px #34d4cd, 0 0 20px #34d4cd, 0 0 30px #34d4cd, 0 0 40px #34d4cd, 0 0 50px #34d4cd, 0 0 75px #34d4cd" : "none"
                        }}
                        onMouseEnter={() => {
                            setHoveredCard1(index);
                        }}
                        onMouseLeave={() => {
                            setHoveredCard1(undefined);
                        }}
                    ></div>
                ))}
            </div>


        </div>
    );
}