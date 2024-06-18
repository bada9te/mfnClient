"use client"
import { useEffect } from "react";

const DollarIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
             className="size-5">
            <path
                d="M10.75 10.818v2.614A3.13 3.13 0 0 0 11.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 0 0-1.138-.432ZM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 0 0-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152Z"/>
            <path fillRule="evenodd"
                  d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-6a.75.75 0 0 1 .75.75v.316a3.78 3.78 0 0 1 1.653.713c.426.33.744.74.925 1.2a.75.75 0 0 1-1.395.55 1.35 1.35 0 0 0-.447-.563 2.187 2.187 0 0 0-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 1 1-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 1 1 1.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 0 1-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 0 1 1.653-.713V4.75A.75.75 0 0 1 10 4Z"
                  clipRule="evenodd"/>
        </svg>
    );
}

const VoteIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path
                d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.879a1.5 1.5 0 0 1 1.06.44l4.122 4.12A1.5 1.5 0 0 1 17 7.622V16.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5v-13Z"/>
        </svg>
    );
}


export default function Battle(props: {
    post1: React.ReactNode,
    post2: React.ReactNode,


}) {
    const {post1, post2} = props;

    useEffect(() => {

    }, [])

    return (
        <div className="card bg-base-100 w-full">
            <div className="card-body justify-center items-center flex flex-col gap-5 p-4">
                <h2 className="card-title">Post1 vs Post2</h2>
                <div className="flex flex-wrap gap-5 justify-center items-center flex-col lg:flex-row">
                    {/* left */}
                    <div className="flex flex-nowrap flex-col">
                        {post1}
                        <div className="p-2 join join-vertical">
                            <button className="btn btn-sm btn-accent w-full join-item"><VoteIcon/>Vote for Post1</button>
                            <button className="btn btn-sm btn-secondary w-full join-item"><DollarIcon/>Supervote</button>
                        </div>
                    </div>

                    {/* mid */}
                    <div className="stats stats-vertical shadow-md w-64">
                        <div className="stat place-items-center">
                            <div className="stat-title">Votes</div>
                            <div className="stat-value">31K</div>
                            <div className="stat-desc">For Post1</div>
                        </div>
                        <div className="stat place-items-center">
                            <span className="countdown font-mono text-2xl">
                                <span style={{"--value":10}}></span>h
                                <span style={{"--value":24}}></span>m
                                <span style={{"--value":12}}></span>s
                            </span>
                        </div>
                        <div className="stat place-items-center">
                            <div className="stat-title">Votes</div>
                            <div className="stat-value">31K</div>
                            <div className="stat-desc">For Post2</div>
                        </div>
                    </div>

                    {/* right */}
                    <div className="flex flex-nowrap flex-col">
                        {post2}
                        <div className="p-2 join join-vertical">
                            <button className="btn btn-sm btn-accent w-full join-item"><VoteIcon/>Vote for Post1</button>
                            <button className="btn btn-sm btn-secondary w-full join-item"><DollarIcon/>Supervote</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}