"use client"

import HeroWrapper from "@/app/components/wrappers/hero-wrapper";
import Image from "next/image";

export default function ErrorPage() {
    return (
        <HeroWrapper
            title=":("
            description=""
        >
            <Image src={"/assets/bgs/404.png"} alt="404" className="w-72" width={1000} height={1000} />
        </HeroWrapper>
    );
}