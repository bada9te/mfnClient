import Image from "next/image";

export default function ChainImage({chainId}: {chainId: number}) {
    return (
        <>
            {
                (() => {
                    switch (chainId) {
                        // test
                        case 97:    return <Image src={"/assets/icons/binance.png"} alt="56" width={30} height={30}/>;

                        // main
                        case 56:    return <Image src={"/assets/icons/binance.png"} alt="56" width={30} height={30}/>;
                        case 42161: return <Image src={"/assets/icons/arbitrum.svg"} alt="42161" width={30} height={30}/>;
                        case 10:    return <Image src={"/assets/icons/optimism.png"} alt="10" width={30} height={30}/>;
                        case 8453:  return <Image src={"/assets/icons/base.png"} alt="8453" width={30} height={30}/>;
                        case 137:   return <Image src={"/assets/icons/polygon.png"} alt="137" width={30} height={30}/>;
                        default:
                            return <span>[unknown]</span>
                    }
                })()
            }
        </>
    );
}