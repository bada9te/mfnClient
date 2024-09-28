"use client"
import "./globals.css";
import { TLang } from "@/types/language";
import ReduxProvider from "@/lib/redux/provider";
import { SnackbarProvider } from 'notistack';
import {ApolloWrapper} from "@/lib/apollo/apollo-wrapper";
import RainbowkitAppProvider from "@/utils/rainbowkit/provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import envCfg from "@/config/env";


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
          <GoogleOAuthProvider clientId={envCfg.passportGoogleID as string}>
              <RainbowkitAppProvider>
                  <ApolloWrapper>
                      <SnackbarProvider maxSnack={5}>
                          <ReduxProvider>
                            {children}
                          </ReduxProvider>
                      </SnackbarProvider>
                  </ApolloWrapper>
              </RainbowkitAppProvider>
          </GoogleOAuthProvider>
    </body>
    </html>
  );
}


