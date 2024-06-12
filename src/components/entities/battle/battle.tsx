"use client"
import { useEffect } from "react";

export default function Battle(props: {
    post1: React.ReactNode,
    post2: React.ReactNode,
    

}) {
    const {post1, post2} = props;

    useEffect(() => {

    }, [])

    return (
        <div className="card bg-base-100 shadow-xl md:w-80 xl:w-full">
            <div className="card-body justify-center items-center flex flex-col gap-5">
                <h2 className="card-title">Post1 vs Post2</h2>
                <div className="flex flex-wrap gap-5 justify-between items-center flex-col xl:flex-row">
                    <div className="flex flex-nowrap flex-col">
                        {post1}
                        <div className="flex flex-nowrap flex-col gap-4 p-2">
                            <button className="btn btn-sm btn-primary w-full">Vote for Post1</button>
                            <button className="btn btn-sm btn-secondary w-full">Supervote</button>
                        </div>
                    </div>
                    <div className="stats stats-vertical shadow w-64">
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
                    <div className="flex flex-nowrap flex-col">
                        {post2}
                        <div className="flex flex-nowrap flex-col gap-4 p-2">
                            <button className="btn btn-sm btn-primary w-full">Vote for Post1</button>
                            <button className="btn btn-sm btn-secondary w-full">Supervote</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}