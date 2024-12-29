import ChainImage from "@/app/components/common/chain-image/chain-image";
import { MFNAddresses, USDCAddresses, config } from "@/app/lib/rainbowkit/config";
import shortenAddress from "@/app/utils/common-functions/shortenAddress";
import Link from "next/link";

export default function ChainsInfo() {
    console.log(Object.entries(MFNAddresses))
    return (
        <div className="flex flex-row flex-wrap gap-4">
            {
                Object.entries(MFNAddresses).map((data, key) => {
                    return (
                        <div key={key} className="card bg-base-100 w-96 shadow-xl h-fit">
                            <div className="card-body text-start">
                                <div className="card-title flex flex-row gap-4">
                                    <ChainImage chainId={Number(data[0])}/> 
                                    <div>{config.chains.find(i => i.id == Number(data[0]))?.name}</div>
                                </div>
                                <div className="flex flex-row gap-3 mt-2 items-center justify-center">
                                    {/* @ts-ignore */}
                                    <p>❤️ Main: {shortenAddress(MFNAddresses[Number(data[0])])}</p>
                                    <button className="btn btn-sm">Copy</button>
                                </div>
                                
                                <div className="flex flex-row gap-3 mt-2 items-center justify-center">
                                    {/* @ts-ignore */}
                                    <p>💵 USDC: {shortenAddress(USDCAddresses[Number(data[0])].address)}</p>
                                    <button className="btn btn-sm">Copy</button>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}