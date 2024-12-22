import { cn } from "@/app/utils/common-functions/cn";
import Marquee from "./marquee";
import whishesToUsers from "@/static-data/whishes-to-users";
import Image from "next/image";
import { getDictionary } from "@/app/dictionaries/dictionaries";


const firstRow = whishesToUsers.slice(0, whishesToUsers.length / 2);
const secondRow = whishesToUsers.slice(whishesToUsers.length / 2);

const ReviewCard = ({
  id,
  img,
  dictionary
}: {
  id: string;
  img: string;
  dictionary: Awaited<ReturnType<typeof getDictionary>>["app"]
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 border-gray-50/[.1] bg-gray-50/[.10] hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-col text-base-content">
        <div className="flex flex-row items-center gap-2">
          <Image alt="info-image" width={10} height={10} className="rounded-full" src={img} />
          <figcaption className="text-sm font-medium dark:text-base-content">
            {/* @ts-ignore */}
            {dictionary.landing.whishes[id].title}
          </figcaption>
        </div>
        <blockquote className="mt-2 text-sm">
          {/* @ts-ignore */}
          {dictionary.landing.whishes[id].body}
        </blockquote>
      </div>
    </figure>
  );
};

export function MarqueeDemo({
  dictionary
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["app"]
}) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {
          firstRow.map((review, key) => (
            <ReviewCard key={key} {...review} dictionary={dictionary}/>
          ))
        }
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review, key) => (
          <ReviewCard key={key} {...review} dictionary={dictionary}/>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-base-300 dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-base-300 dark:from-background"></div>
    </div>
  );
}
