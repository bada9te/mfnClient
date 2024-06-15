"use client"
import React, {useState} from "react";

export default function Pagination() {
    const [selectedOption, setSelectedOption] = useState("3"); // Assuming "3" is the default checked option

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(e.target.getAttribute("aria-label") as string);
    };

    return (
        <div className="w-full flex justify-center my-10">
            <div className="join">
                <input
                    className="join-item btn btn-square"
                    type="radio"
                    name="options"
                    aria-label="1"
                    checked={selectedOption === "1"}
                    onChange={handleOptionChange}
                />
                <input
                    className="join-item btn btn-square"
                    type="radio"
                    name="options"
                    aria-label="2"
                    checked={selectedOption === "2"}
                    onChange={handleOptionChange}
                />
                <input
                    className="join-item btn btn-square"
                    type="radio"
                    name="options"
                    aria-label="3"
                    checked={selectedOption === "3"}
                    onChange={handleOptionChange}
                />
                <input
                    className="join-item btn btn-square"
                    type="radio"
                    name="options"
                    aria-label="4"
                    checked={selectedOption === "4"}
                    onChange={handleOptionChange}
                />
                <input
                    className="join-item btn btn-square"
                    type="radio"
                    name="options"
                    aria-label="5"
                    checked={selectedOption === "5"}
                    onChange={handleOptionChange}
                />
            </div>
        </div>
    );
}