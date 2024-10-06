"use client"
import "./globals.css";
import { TLang } from "@/types/language";
import ReduxProvider from "@/lib/redux/provider";
import { SnackbarProvider } from 'notistack';
import {ApolloWrapper} from "@/lib/apollo/apollo-wrapper";
import RainbowkitAppProvider from "@/utils/rainbowkit/provider";


export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { lang: TLang }
}>) {
  return (
    <html lang={params.lang} data-theme="black">
      <body>
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


