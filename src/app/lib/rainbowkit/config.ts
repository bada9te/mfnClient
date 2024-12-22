import { http, createConfig } from '@wagmi/core'
import { 
  bscTestnet, 
  arbitrum,
  base,
  polygon,
  optimism,
} from '@wagmi/core/chains'
import envCfg from '../../config/env';

import abi97 from "./abis/testnet/USDC-97.json";
import abi137 from "./abis/mainnet/USDC-137.json";
import abi8453 from "./abis/mainnet/USDC-8453.json";
import abi42161 from "./abis/mainnet/USDC-42161.json";
import abi10 from "./abis/mainnet/USDC-10.json";

export const testnetChains = [bscTestnet];
export const testnetTransports = {
  [bscTestnet.id]: http(),
}

export const mainnetChains = [arbitrum, optimism, base, polygon];
export const mainnetTransports = {
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
    // arbitrum
    42161: "0x5F0b39f1AD905FE479FC1B8EC64C0a0cB761C85A",
    // optimism
    10: "0x914866b0a1c0851F526eC7d154A77AC010921c06",
    // base
    8453: "0x8226b11106A5Ac26C3F2c47c5D7C62C22d2F5f18",
    // polygon
    137: "0xc0037FEF7BFd798Eb23022eb011DacD650D4e91c"
  }
  :
  {
    // bsc testnet
    97: "0x5F0b39f1AD905FE479FC1B8EC64C0a0cB761C85A"
  }