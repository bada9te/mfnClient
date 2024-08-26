"use client"
import "../globals.css";
import AppBar from "@/components/bars/appbar/appbar";
import BottomNav from "@/components/bars/bottom-nav/bottom-nav";
import Footer from "@/components/common/footer/footer";
import ReduxProvider from "@/lib/redux/provider";
import { SnackbarProvider } from 'notistack';
import {ApolloWrapper} from "@/lib/apollo/apollo-wrapper";
import NextTopLoader from "nextjs-toploader";
import RainbowkitAppProvider from "@/utils/rainbowkit/provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import envCfg from "@/config/env";
import CategoriesContainerLeftbar from "@/components/containers/categories-container/categories-container-leftbar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
        <GoogleOAuthProvider clientId={envCfg.passportGoogleID as string}>
            <RainbowkitAppProvider>
                <ApolloWrapper>
                    <SnackbarProvider maxSnack={5}>
                        <ReduxProvider>
                        <div className="min-h-screen flex flex-col">
                            {/* AppBar */}
                            <div className="bg-gray-800 text-white">
                                {/* AppBar content goes here */}
                                <AppBar/>
                            </div>

                            {/* Grid layout */}
                            <div className="flex-1 grid grid-cols-[auto] lg:grid-cols-[320px_auto] grid-rows-1 overflow-hidden">
                                {/* Left sidebar (hidden on smaller screens) */}
                                <div className="hidden lg:block">
                                    <div className="card w-full max-h-[calc(100vh-95px)] fixed top-12 left-0">
                                        <div className="overflow-y-auto flex flex-col gap-4 py-10 ml-4 no-scrollbar">
                                            <CategoriesContainerLeftbar/>
                                        </div>
                                    </div>
                                </div>

                                {/* Main content area */}
                                <div className="col-auto flex-1">
                                    <div className="card w-full my-14 md:my-[72px]">
                                        <div className="card-body p-0 gap-0">
                                            <NextTopLoader 
                                                color="#fff"
                                                initialPosition={0.18}
                                                crawlSpeed={200}
                                                height={5}
                                                crawl={true}
                                                showSpinner={false}
                                                easing="ease"
                                                speed={300}
                                                //shadow="0 0 10px #2299DD,0 0 5px #2299DD",
                                            />
                                            {children}
                                            <div className="p-2 pb-4 md:p-4">
                                                <Footer/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom navigation bar */}
                            <div className="bg-gray-800 text-white">
                                {/* BottomNav content goes here */}
                                <BottomNav/>
                            </div>
                        </div>
                            
                        </ReduxProvider>
                    </SnackbarProvider>
                </ApolloWrapper>
            </RainbowkitAppProvider>
        </GoogleOAuthProvider>
  );
}
