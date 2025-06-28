import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from 'react';
//@ts-ignore
import { WagmiProvider } from 'wagmi';
import envCfg from '@/app/config/env';
import { mainnetChains, testnetChains } from './config';


const config = getDefaultConfig({
    appName: "Tunes Hub",
    projectId: envCfg.rainbowkitId as string,
    // @ts-ignore
    chains: envCfg.envType === "production" ? mainnetChains : testnetChains,
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