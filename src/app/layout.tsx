"use client"
import "./globals.css";
import { TLang } from "@/types/language";
import ReduxProvider from "@/lib/redux/provider";
import { SnackbarProvider } from 'notistack';
import {ApolloWrapper} from "@/lib/apollo/apollo-wrapper";
import RainbowkitAppProvider from "@/utils/rainbowkit/provider";
import { Anonymous_Pro, DotGothic16, Noto_Sans, Pixelify_Sans, Reggae_One, Train_One } from "next/font/google";

const font = Anonymous_Pro({
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
    <html lang={params.lang} data-theme="black">
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


