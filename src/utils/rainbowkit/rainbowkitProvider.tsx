import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import React from 'react';


const config = getDefaultConfig({
    appName: "RainbowKit App",
    projectId: 'aec84fc090cad6ff22325f167a1b60a1',
    chains: [mainnet, polygon, optimism, arbitrum, base],
});


const queryClient = new QueryClient();
export default function RainbowkitAppProvider(props: {
  children: React.ReactNode
}) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {props.children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};