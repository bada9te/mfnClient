"use client"
import React from "react";

export default function Pagination(props: {
    page: number;
    maxPage: number;
}) {
    const page = props.page;
    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.getAttribute("aria-label") as string);
    };

    return (
        <div className="w-full flex justify-center my-10">
            <div className="join">
                <input
                    className="join-item btn btn-square"
                    type="radio"
                    name="options"
                    aria-label={""+page}
                    checked={true}
                    onChange={handleOptionChange}
                />

            </div>
        </div>
    );
}