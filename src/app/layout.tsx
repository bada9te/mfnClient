"use client"
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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="black">
    <body>
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
                                <div className="card w-full max-h-[calc(100vh-125px)] rounded-none fixed top-16 left-0">
                                    <div className="overflow-y-auto flex flex-col gap-8 py-10 ml-8 no-scrollbar">
                                        {
                                            genres.map((gen, i) => {
                                                return (
                                                    <CategoryLeftBar
                                                        key={i}
                                                        title={gen.title}
                                                        bgImage={gen.bg}
                                                        iconImage={gen.icon}
                                                        description={gen.description}
                                                    />
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* Main content area */}
                            <div className="col-auto flex-1 no-scrollbar">
                                <div className="card w-full rounded-none my-14 md:my-[72px]">
                                    <div className="card-body p-0 gap-0">
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
