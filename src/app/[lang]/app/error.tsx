"use client"

import HeroWrapper from "./components/wrappers/hero-wrapper";
import Image from "next/image";

export default function ErrorPage() {
    return (
        <HeroWrapper
            title=":("
            description="Internal server error"
        >
            <></>
        </HeroWrapper>
    );
}