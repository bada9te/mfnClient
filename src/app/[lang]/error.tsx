"use client"

import HeroWrapper from "@/components/wrappers/hero-wrapper";
import Image from "next/image";

export default function ErrorPage() {
    return (
        <HeroWrapper
            title="Content is not available"
            description=""
        >
            <Image src={"/assets/bgs/404.png"} alt="404" className="w-72" width={1000} height={1000} />
        </HeroWrapper>
    );
}