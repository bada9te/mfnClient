"use client"
import "./globals.css";
import { TLang } from "@/app/types/language";
import ReduxProvider from "./lib/redux/provider";
import { SnackbarProvider } from 'notistack';
import {ApolloWrapper} from "./lib/apollo/apollo-wrapper";
import RainbowkitAppProvider from "./lib/rainbowkit/provider";
import { Montserrat } from "next/font/google";

const font = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: '400'
})

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { lang: TLang }
}>) {
  return (
    <html lang={params.lang} data-theme="dim">
      <body className={font.className}>
        <RainbowkitAppProvider>
            <ApolloWrapper>
                <SnackbarProvider maxSnack={5}>
                    <ReduxProvider>
                      {children}
                    </ReduxProvider>
                </SnackbarProvider>
            </ApolloWrapper>
        </RainbowkitAppProvider>
      </body>
    </html>
  );
}


