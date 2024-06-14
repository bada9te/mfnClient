import React from "react";

export default function Playlist(props: {
    title: string;
    posts: React.ReactNode[];
}) {
    const { posts, title } = props;
    return (
        <div className="collapse collapse-plus bg-base-200 rounded-2xl shadow-md">
            <input type="checkbox" name="my-accordion-3"/>
            <div className="collapse-title text-xl font-medium">
                {title}
            </div>
            <div className="collapse-content flex flex-wrap gap-5 md:gap-3 justify-center">
                {
                    posts.map((post, index) => (
                        <div key={index}>{post}</div>
                    ))
                }
            </div>
        </div>
    );
}