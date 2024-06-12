import React from "react";

export default function Playlist(props: {
    title: string;
    posts: React.ReactNode[];
}) {
    const { posts, title } = props;
    return (
        <div className="collapse collapse-plus bg-base-200">
            <input type="checkbox" name="my-accordion-3"/>
            <div className="collapse-title text-xl font-medium">
                {title}
            </div>
            <div className="collapse-content flex flex-wrap gap-5 justify-between">
                {
                    posts.map((post, index) => (
                        <div key={index}>{post}</div>
                    ))
                }
            </div>
        </div>
    );
}