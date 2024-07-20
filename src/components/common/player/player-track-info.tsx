import config from "@/../next.config.mjs";


export default function PlayerTrackInfo() {
    return (
        <div className="flex h-auto flex-col flex-1 gap-1">
            <img 
                src={`${config.env?.serverBase}/files/pngtree-abstract-bg-image_914283.png`}
                className="my-5 shadow-2xl h-auto w-auto" 
            />
            <p className="text-white text-2xl font-bold">Track title</p>
            <p className="text-white text-md font-bold">Track description</p>
        </div>
    );
}