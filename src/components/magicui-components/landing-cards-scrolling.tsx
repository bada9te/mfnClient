import { cn } from "@/lib/utils";
import Marquee from "./marquee";
import whishesToUsers from "@/config/whishes-to-users";


const firstRow = whishesToUsers.slice(0, whishesToUsers.length / 2);
const secondRow = whishesToUsers.slice(whishesToUsers.length / 2);

const ReviewCard = ({
  img,
  title,
  body,
}: {
  img: string;
  title: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 border-gray-50/[.1] bg-gray-50/[.10] hover:bg-gray-50/[.15]",
      )}
    >

        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-2">
            <img className="rounded-full" width="32" height="32" alt="" src={img} />
            <figcaption className="text-sm font-medium dark:text-white">
              {title}
            </figcaption>
          </div>
          <blockquote className="mt-2 text-sm">{body}</blockquote>
        </div>
      
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {
          firstRow.map((review, key) => (
            <ReviewCard key={key} {...review} />
          ))
        }
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review, key) => (
          <ReviewCard key={key} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-base-300 dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-base-300 dark:from-background"></div>
    </div>
  );
}
