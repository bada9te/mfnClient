import React from "react";

export default function MainButton({children, handler, color, width, height, padding}: {
    children: React.ReactNode;
    handler: () => void;
    color: "primary" | "error" | "success";
    width?: string;
    height?: string;
    padding?: string;
}) {
    return (
        <button 
            onClick={handler} 
            className={`glass ${width ? `w-[${width}]` : 'w-full'} group relative inline-flex ${height ? `h-${height}` : 'h-12'} items-center justify-center overflow-hidden rounded-md bg-gradient-to-r ${color === "error" && 'from-red-500 to-red-900 border-red-500 [box-shadow:5px_5px_rgb(107_17_17)] active:[box-shadow:0px_0px_rgb(17_99_95)]'} ${color === "primary" && 'from-[#29d8cf] to-[#1ba39c] border-[#1ba39c] [box-shadow:5px_5px_rgb(17_99_95)] active:[box-shadow:0px_0px_rgb(17_99_95)]'} ${color === "success" && 'from-[#58c454] to-[#197416] border-[#58c454] [box-shadow:5px_5px_rgb(25_116_22)] active:[box-shadow:0px_0px_rgb(25_116_22)]'} bg-transparent font-medium dark:text-white text-black transition-all duration-100 [box-shadow:5px_5px_rgb(107_17_17)] active:translate-x-[3px] ${padding ? `p-${padding}` : 'px-6'} active:translate-y-[3px] disabled:opacity-55`}>
            {children}
        </button>
    );
}