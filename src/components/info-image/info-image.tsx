export default function InfoImage(props: {
    text: string;
}) {
    return (
        <div className="w-full flex justify-center items-center flex-col gap-4">
            <img
                src={'/assets/icons/logo_clear.png'}
                alt={'logo'}
                width={100}
                height={100}
                className="rounded-full"
            />
            <p className="font-bold text-white">{props.text}</p>
        </div>
    );
}