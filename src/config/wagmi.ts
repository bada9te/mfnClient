import { http, createConfig } from '@wagmi/core'
import { 
  bsc, bscTestnet, 
  arbitrum,
  avalanche,
  base,
  polygon,
  optimism,
} from '@wagmi/core/chains'
import envCfg from './env';
import abi97 from "@/config/abis/testnet/USDC-97.json";
import abi56 from "@/config/abis/mainnet/USDC-56.json";
import abi137 from "@/config/abis/mainnet/USDC-137.json";
import abi8453 from "@/config/abis/mainnet/USDC-8453.json";
import abi42161 from "@/config/abis/mainnet/USDC-42161.json";
import abi10 from "@/config/abis/mainnet/USDC-10.json";

export const testnetChains = [bscTestnet];
export const testnetTransports = {
  [bscTestnet.id]: http(),
}

export const mainnetChains = [bsc, arbitrum, optimism, base, polygon];
export const mainnetTransports = {
  [bsc.id]: http(),
  [arbitrum.id]: http(),
  [base.id]: http(),
  [polygon.id]: http(),
  [optimism.id]: http(),
}

export const config = createConfig({
  // @ts-ignore
  chains: envCfg.envType === "production" ? mainnetChains : testnetChains,
  // @ts-ignore
  transports: envCfg.envType === "production" ? mainnetTransports : testnetTransports,
});

export const USDCAddresses = 
  envCfg.envType === "production"
  ?
  {
    // bsc
    56: {
      address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
      abi: abi56,
      icon: '/assets/icons/binance.png'
    },
    // arbitrum
    42161: {
      address: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
      abi: abi42161,
      icon: '/assets/icons/arbitrum.svg'
    },
    // optimism
    10: {
      address: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
      abi: abi10,
      icon: '/assets/icons/optimism.png'
    },
    // base
    8453: {
      address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      abi: abi8453,
      icon: '/assets/icons/base.png'
    },
    // polygon
    137: {
      address: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
      abi: abi137,
      icon: '/assets/icons/polygon.png'
    },
  }
  : 
  {
    // bsc testnet
    97: {
      address: "0x11562f66bCa542b1345D18963a2ac3f86D2cc07a",
      abi: abi97,
      icon: '/assets/icons/binance.png'
    },
  }

export const MFNAddresses = 
  envCfg.envType === "production"
  ?
  {
    // bsc
    56: "0x914866b0a1c0851F526eC7d154A77AC010921c06",
    // arbitrum
    42161: "0x423f1FBD747D229C2fe8C2Ead9df27c364ecC3Fd",
    // optimism
    10: "0x423f1FBD747D229C2fe8C2Ead9df27c364ecC3Fd",
    // base
    8453: "0x9bD60b6307B5AB97Ba9A9f59326e46957c08CFd1",
    // polygon
    137: "0x8226b11106A5Ac26C3F2c47c5D7C62C22d2F5f18"
  }
  :
  {
    // bsc testnet
    97: "0x914866b0a1c0851F526eC7d154A77AC010921c06"
  }