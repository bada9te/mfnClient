import Image from "next/image";

export default function InfoImage(props: {
    text: string;
    image: string;
}) {
    return (
        <div className="w-full h-fit flex-1 flex justify-center items-center flex-col gap-4">
            <Image
                src={props.image}
                alt={'logo'}
                width={300}
                height={300}
                className="rounded-full w-32"
            />
            <span className="font-bold text-center">{props.text}</span>
        </div>
    );
}