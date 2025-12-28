import React from "react";
import { cn } from "@/app/utils/common-functions/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    color: "primary" | "error" | "success";
}

// define color-specific classes
const colorClasses: Record<ButtonProps["color"], string> = {
    primary: "bg-gradient-to-r from-[#29d8cf] to-[#1ba39c] border-[#1ba39c]",
    success: "bg-green-600 border-green-600 hover:bg-green-700",
    error: "bg-red-600 border-red-600 hover:bg-red-700",
};

export default function MainButton({ children, color, className, ...otherProps }: ButtonProps) {
    return (
        <button
            {...otherProps}
            className={cn(
                "text-white group relative inline-flex h-7 items-center justify-center overflow-hidden rounded-md px-6 font-medium transition-all duration-100 [box-shadow:5px_5px_rgb(17_99_95)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(17_99_95)] disabled:opacity-55",
                colorClasses[color], // apply color-specific styles
                className
            )}
        >
            {children}
        </button>
    );
}
