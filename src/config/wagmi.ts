import { http, createConfig } from '@wagmi/core'
import { bscTestnet, bsc } from '@wagmi/core/chains'


export const config = createConfig({
  chains: [bscTestnet, bsc],
  transports: {
    [bscTestnet.id]: http(),
    [bsc.id]: http(),
  },
});