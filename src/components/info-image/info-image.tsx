export default function InfoImage(props: {
    text: string;
}) {
    return (
        <div className="w-full flex justify-center items-center flex-col gap-4 flex-1">
            <div className="flex flex-1 flex-col justify-end">
                <img
                    src={'/assets/icons/logo_clear.png'}
                    alt={'logo'}
                    width={100}
                    height={100}
                    className="rounded-full"
                />
            </div>
            <p className="font-bold">{props.text}</p>
        </div>
    );
}