import React from "react";
import { cn } from "@/lib/utils";

export default function MainButton({children, handler, color, width, height, padding, className}: {
    children: React.ReactNode;
    handler: () => void;
    color: "primary" | "error" | "success";
    width?: string;
    height?: string;
    padding?: string;
    className?: string;
}) {
    return (
        <button 
            onClick={handler} 
            className={cn(` ${width ? `w-[${width}]` : 'w-full'} text-base-content group relative inline-flex ${height ? `h-${height}` : 'h-12'} items-center justify-center overflow-hidden rounded-md bg-gradient-to-r ${color === "error" && 'from-red-500 to-red-900 border-red-500'} ${color === "primary" && 'from-[#29d8cf] to-[#11635f] border-[#1ba39c]'} ${color === "success" && 'from-[#58c454] to-[#197416] border-[#58c454]'} bg-transparent font-medium dark:text-base-content text-black transition-all duration-100 [box-shadow:5px_5px_rgb(107_17_17)] active:translate-x-[3px] ${padding ? `p-${padding}` : 'px-6'} active:translate-y-[3px] disabled:opacity-55`, className)}>
            {children}
        </button>
    );
}