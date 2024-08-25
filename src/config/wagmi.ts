import { http, createConfig } from '@wagmi/core'
import { 
  bsc, bscTestnet, 
  arbitrum,
  avalanche,
  base,
  polygon,
} from '@wagmi/core/chains'
import envCfg from './env';
import abi97 from "@/config/abis/testnet/USDC-97.json";
import abi56 from "@/config/abis/mainnet/USDC-56.json";
import abi137 from "@/config/abis/mainnet/USDC-137.json";
import abi8453 from "@/config/abis/mainnet/USDC-8453.json";
import abi42161 from "@/config/abis/mainnet/USDC-42161.json";
import abi43114 from "@/config/abis/mainnet/USDC-43114.json";

export const testnetChains = [bscTestnet];
export const testnetTransports = {
  [bscTestnet.id]: http(),
}

export const mainnetChains = [bsc, arbitrum, avalanche, base, polygon];
export const mainnetTransports = {
  [bsc.id]: http(),
  [arbitrum.id]: http(),
  [avalanche.id]: http(),
  [base.id]: http(),
  [polygon.id]: http(),
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
      icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none"><g clip-path="url(%23a)"><path fill="%23F0B90B" fill-rule="evenodd" d="M14 0c7.733 0 14 6.267 14 14s-6.267 14-14 14S0 21.733 0 14 6.267 0 14 0Z" clip-rule="evenodd"/><path fill="%23fff" d="m7.694 14 .01 3.702 3.146 1.85v2.168l-4.986-2.924v-5.878L7.694 14Zm0-3.702v2.157l-1.832-1.083V9.214l1.832-1.083 1.841 1.083-1.84 1.084Zm4.47-1.084 1.832-1.083 1.84 1.083-1.84 1.084-1.832-1.084Z"/><path fill="%23fff" d="M9.018 16.935v-2.168l1.832 1.084v2.157l-1.832-1.073Zm3.146 3.394 1.832 1.084 1.84-1.084v2.157l-1.84 1.084-1.832-1.084V20.33Zm6.3-11.115 1.832-1.083 1.84 1.083v2.158l-1.84 1.083v-2.157l-1.832-1.084Zm1.832 8.488.01-3.702 1.831-1.084v5.879l-4.986 2.924v-2.167l3.145-1.85Z"/><path fill="%23fff" d="m18.982 16.935-1.832 1.073v-2.157l1.832-1.084v2.168Z"/><path fill="%23fff" d="m18.982 11.065.01 2.168-3.155 1.85v3.712l-1.831 1.073-1.832-1.073v-3.711l-3.155-1.851v-2.168l1.84-1.083 3.135 1.86 3.155-1.86 1.84 1.083h-.007Zm-9.964-3.7 4.977-2.935 4.987 2.935-1.832 1.083-3.154-1.86-3.146 1.86-1.832-1.083Z"/></g><defs><clipPath id="a"><path fill="%23fff" d="M0 0h28v28H0z"/></clipPath></defs></svg>'
    },
    // arbitrum
    42161: {
      address: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
      abi: abi42161,
      icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none"><rect width="26.6" height="26.6" x=".7" y=".7" fill="%232D374B" stroke="%2396BEDC" stroke-width="1.4" rx="13.3"/><mask id="a" width="28" height="28" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><rect width="28" height="28" fill="%23C4C4C4" rx="14"/></mask><g mask="url(%23a)"><path fill="%2328A0F0" d="m14.0861 18.6041 6.5014 10.2239 4.0057-2.3213-7.86-12.3943-2.6471 4.4917Zm13.0744 3.4692-.003-1.8599-7.3064-11.407-2.3087 3.9173 7.091 11.4303 2.172-1.2586a.9628.9628 0 0 0 .3555-.7009l-.0004-.1212Z"/><rect width="25.9" height="25.9" x="1.05" y="1.05" fill="url(%23b)" fill-opacity=".3" stroke="%2396BEDC" stroke-width="2.1" rx="12.95"/><path fill="%23fff" d="m.3634 28.2207-3.07-1.7674-.234-.8333L7.7461 9.0194c.7298-1.1913 2.3197-1.575 3.7957-1.5541l1.7323.0457L.3634 28.2207ZM19.1655 7.511l-4.5653.0166L2.24 27.9533l3.6103 2.0788.9818-1.6652L19.1655 7.511Z"/></g><defs><linearGradient id="b" x1="0" x2="14" y1="0" y2="28" gradientUnits="userSpaceOnUse"><stop stop-color="%23fff"/><stop offset="1" stop-color="%23fff" stop-opacity="0"/></linearGradient></defs></svg>%0A'
    },
    // avalanche
    43114: {
      address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
      abi: abi43114,
      icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none"><path fill="%23fff" d="M23 5H5v18h18V5Z"/><path fill="%23E84142" fill-rule="evenodd" d="M14 28c-7.513.008-14-6.487-14-14C0 6.196 6.043-.008 14 0c7.95.008 14 6.196 14 14 0 7.505-6.495 13.992-14 14Zm-3.971-7.436H7.315c-.57 0-.851 0-1.023-.11a.69.69 0 0 1-.313-.54c-.01-.202.13-.45.412-.944l6.7-11.809c.285-.501.43-.752.612-.845.195-.1.429-.1.625 0 .182.093.326.344.611.845l1.377 2.404.007.013c.308.538.464.81.533 1.097a2.04 2.04 0 0 1 0 .954c-.07.289-.224.564-.536 1.11l-3.52 6.22-.009.017c-.31.542-.467.817-.684 1.024a2.048 2.048 0 0 1-.835.485c-.285.079-.604.079-1.243.079Zm6.852 0h3.888c.574 0 .862 0 1.034-.113a.687.687 0 0 0 .313-.543c.01-.196-.128-.434-.398-.9a8.198 8.198 0 0 1-.028-.048l-1.948-3.332-.022-.037c-.274-.463-.412-.697-.59-.787a.684.684 0 0 0-.621 0c-.179.093-.323.337-.608.828l-1.94 3.331-.007.012c-.284.49-.426.735-.416.936.014.22.127.423.313.543.168.11.456.11 1.03.11Z" clip-rule="evenodd"/></svg>%0A'
    },
    // base
    8453: {
      address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      abi: abi8453,
      icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><g fill="none" fill-rule="evenodd"><path fill="%230052FF" fill-rule="nonzero" d="M14 28a14 14 0 1 0 0-28 14 14 0 0 0 0 28Z"/><path fill="%23FFF" d="M13.967 23.86c5.445 0 9.86-4.415 9.86-9.86 0-5.445-4.415-9.86-9.86-9.86-5.166 0-9.403 3.974-9.825 9.03h14.63v1.642H4.142c.413 5.065 4.654 9.047 9.826 9.047Z"/></g></svg>'
    },
    // polygon
    137: {
      address: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
      abi: abi137,
      icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><linearGradient id="A" x1="-18.275%" x2="84.959%" y1="8.219%" y2="71.393%"><stop offset="0%" stop-color="%23a229c5"/><stop offset="100%" stop-color="%237b3fe4"/></linearGradient><circle id="B" cx="14" cy="14" r="14"/></defs><g fill-rule="evenodd"><mask id="C" fill="%23fff"><use xlink:href="%23B"/></mask><g fill-rule="nonzero"><path fill="url(%23A)" d="M-1.326-1.326h30.651v30.651H-1.326z" mask="url(%23C)"/><path fill="%23fff" d="M18.049 17.021l3.96-2.287a.681.681 0 0 0 .34-.589V9.572a.683.683 0 0 0-.34-.59l-3.96-2.286a.682.682 0 0 0-.68 0l-3.96 2.287a.682.682 0 0 0-.34.589v8.173L10.29 19.35l-2.777-1.604v-3.207l2.777-1.604 1.832 1.058V11.84l-1.492-.861a.681.681 0 0 0-.68 0l-3.96 2.287a.681.681 0 0 0-.34.589v4.573c0 .242.13.468.34.59l3.96 2.286a.68.68 0 0 0 .68 0l3.96-2.286a.682.682 0 0 0 .34-.589v-8.174l.05-.028 2.728-1.575 2.777 1.603v3.208l-2.777 1.603-1.83-1.056v2.151l1.49.86a.68.68 0 0 0 .68 0z"/></g></g></svg>'
    },
  }
  : 
  {
    // bsc testnet
    97: {
      address: "0x16227D60f7a0e586C66B005219dfc887D13C9531",
      abi: abi97,
      icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none"><g clip-path="url(%23a)"><path fill="%23F0B90B" fill-rule="evenodd" d="M14 0c7.733 0 14 6.267 14 14s-6.267 14-14 14S0 21.733 0 14 6.267 0 14 0Z" clip-rule="evenodd"/><path fill="%23fff" d="m7.694 14 .01 3.702 3.146 1.85v2.168l-4.986-2.924v-5.878L7.694 14Zm0-3.702v2.157l-1.832-1.083V9.214l1.832-1.083 1.841 1.083-1.84 1.084Zm4.47-1.084 1.832-1.083 1.84 1.083-1.84 1.084-1.832-1.084Z"/><path fill="%23fff" d="M9.018 16.935v-2.168l1.832 1.084v2.157l-1.832-1.073Zm3.146 3.394 1.832 1.084 1.84-1.084v2.157l-1.84 1.084-1.832-1.084V20.33Zm6.3-11.115 1.832-1.083 1.84 1.083v2.158l-1.84 1.083v-2.157l-1.832-1.084Zm1.832 8.488.01-3.702 1.831-1.084v5.879l-4.986 2.924v-2.167l3.145-1.85Z"/><path fill="%23fff" d="m18.982 16.935-1.832 1.073v-2.157l1.832-1.084v2.168Z"/><path fill="%23fff" d="m18.982 11.065.01 2.168-3.155 1.85v3.712l-1.831 1.073-1.832-1.073v-3.711l-3.155-1.851v-2.168l1.84-1.083 3.135 1.86 3.155-1.86 1.84 1.083h-.007Zm-9.964-3.7 4.977-2.935 4.987 2.935-1.832 1.083-3.154-1.86-3.146 1.86-1.832-1.083Z"/></g><defs><clipPath id="a"><path fill="%23fff" d="M0 0h28v28H0z"/></clipPath></defs></svg>'
    },
  }