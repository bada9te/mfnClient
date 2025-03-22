import LandingPart1 from "@/app/[lang]/components/part1/part1";
import LandingPart2 from "@/app/[lang]/components/part2/part2";
import {TLang} from "@/app/types/language";
import LandingPart3 from "@/app/[lang]/components/part3/part3";
import LandingPart4 from "@/app/[lang]/components/part4/part4";
import LandingPart5 from "@/app/[lang]/components/part5/part5";

export default function Landing({params}: {params: {lang: TLang}}) {
    return (
        <div className="flex flex-col gap-10 py-10 px-8">
            <LandingPart1/>
            <LandingPart2 params={params}/>
            <LandingPart3 params={params}/>
            <LandingPart4/>
            <LandingPart5/>
        </div>
    );
}

