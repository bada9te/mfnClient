"use client"
import React from "react";

export const MFNWarning = React.forwardRef((props, ref) => {
    return (
        <div 
            {...props} 
            ref={ref} 
            className="
                h-14
                bg-warning text-base-300
                text-lg font-bold
                flex flex-row justify-start items-center gap-2
                p-2 px-5
                rounded-2xl
                shadow-2xl
            "
        >
            <div>⚡</div>
            {props.message}
        </div>
    );
});

MFNWarning.displayName = "MFNWarning";