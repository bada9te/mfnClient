import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig,
    RainbowKitProvider,
    darkTheme
} from '@rainbow-me/rainbowkit';

import {
    bscTestnet,
} from '@wagmi/core/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import React from 'react';
//@ts-ignore
import { WagmiProvider } from 'wagmi';


const config = getDefaultConfig({
    appName: "RainbowKit App",
    projectId: 'aec84fc090cad6ff22325f167a1b60a1',
    chains: [bscTestnet],
    ssr: true,
});


const queryClient = new QueryClient();
export default function RainbowkitAppProvider(props: {
  children: React.ReactNode
}) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={darkTheme()}>
                    {props.children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};