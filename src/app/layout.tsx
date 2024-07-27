"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import AppBar from "@/components/bars/appbar/appbar";
import BottomNav from "@/components/bars/bottom-nav/bottom-nav";
import Footer from "@/components/common/footer/footer";
import CategoryLeftBar from "@/components/bars/category-leftbar/category-leftbar";
import {genres} from "@/config/categories";
import ReduxProvider from "@/lib/redux/provider";
import { SnackbarProvider } from 'notistack';
import {ApolloWrapper} from "@/lib/apollo/apollo-wrapper";
import NextTopLoader from "nextjs-toploader";
import RainbowkitAppProvider from "@/utils/rainbowkit/provider";
import { Suspense } from "react";


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dracula">
    <body>
        <RainbowkitAppProvider>
            <ApolloWrapper>
                <SnackbarProvider maxSnack={5}>
                    <ReduxProvider>
                        <AppBar/>
                        <div className="grid grid-cols-[auto] lg:grid-cols-[320px_auto] grid-rows-1">
                            <div className="hidden lg:block">
                                <div className="card w-full main-layout-card rounded-none">
                                    <div className="overflow-y-auto flex flex-col gap-8 no-scrollbar py-8">
                                        {
                                            genres.map((gen, i) => {
                                                return (
                                                    <CategoryLeftBar
                                                        key={i}
                                                        title={gen.title}
                                                        bgImage={gen.bg}
                                                        iconImage={gen.icon}
                                                    />
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={`col-auto flex-1`}>
                                <div className="card w-full main-layout-card rounded-none">
                                    <div className="card-body overflow-y-auto p-0 gap-0 no-scrollbar">
                                        <NextTopLoader 
                                            color="#1ba39c"
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
                                        <div className="p-0 md:p-8">
                                            <Footer/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <BottomNav/>
                    </ReduxProvider>
                </SnackbarProvider>
            </ApolloWrapper>
        </RainbowkitAppProvider>
    </body>
    </html>
  );
}


/*
<div className={`hidden xl:block col-auto max-w-80`}>
    <div className="card bg-base-100 w-full main-layout-card rounded-none">
        <div className="overflow-y-auto p-0 no-scrollbar pb-10">
            <div className="h-[80px] flex justify-between items-center text-white px-5">
                <p className="font-bold text-xl">In player:</p>
            </div>
            <CurrentTrackRightBar/>
        </div>
    </div>
</div>
*/
