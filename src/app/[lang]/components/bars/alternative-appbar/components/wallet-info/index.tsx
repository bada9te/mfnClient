import { useAppSelector } from "@/app/lib/redux/store";
import shortenAddress from "@/app/utils/common-functions/shortenAddress";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useAccount } from "wagmi";

export default function WalletInfo () {
    const { openAccountModal } = useAccountModal();
    const { openConnectModal } = useConnectModal()
    const { address } = useAccount();
    const user = useAppSelector(state => state.user.user);

    return (
        <div className="w-full">
            <button type="button" onClick={user?._id && address ? openAccountModal : openConnectModal} className="btn btn-sm bg-indigo-500 hover:bg-indigo-700 text-base-content px-5 w-full">
                <Image src={"/assets/icons/ethereum-eth.svg"} width={22} height={22} alt="eth" />
                <span>{user?._id && address ? shortenAddress(address) : "Connect wallet"}</span>
            </button>
        </div>
    );
}