"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import AppBar from "@/components/bars/appbar/appbar";
import BottomNav from "@/components/bars/bottom-nav/bottom-nav";
import Footer from "@/components/common/footer/footer";
import CategoryLeftBar from "@/components/bars/category-leftbar/category-leftbar";
import {genres} from "@/config/categories";
import CurrentTrackRightBar from "@/components/bars/current-track-rightbar/current-track-rightbar";
import ReduxProvider from "@/lib/redux/provider";
import { SnackbarProvider } from 'notistack';
import {ApolloWrapper} from "@/lib/apollo/apollo-wrapper";


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="retro">
    <body className={inter.className}>
        <ApolloWrapper>
            <SnackbarProvider maxSnack={5}>
                <ReduxProvider>
                    <AppBar/>
                    <div className="grid grid-cols-5 grid-rows-1">
                        <div className="hidden xl:block">
                            <div className="card bg-base-100 shadow-xl w-full main-layout-card rounded-none">
                                <div className="overflow-y-auto flex flex-col gap-0 thin-scrollbar">
                                    {
                                        genres.map((gen, i) => {
                                            return (
                                                <CategoryLeftBar
                                                    key={i}
                                                    title={gen.title}
                                                    bgImage={gen.bg}
                                                />
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-span-5 xl:col-span-3">
                            <div className="card bg-base-100 shadow-xl w-full main-layout-card rounded-none">
                                <div className="card-body overflow-y-auto p-0 gap-0 thin-scrollbar">
                                    {children}
                                    <Footer/>
                                </div>
                            </div>
                        </div>
                        <div className="hidden xl:block">
                            <div className="card bg-base-100 w-full main-layout-card rounded-none">
                                <div className="overflow-y-auto p-0 pb-2 thin-scrollbar">
                                    <CurrentTrackRightBar/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <BottomNav/>
                </ReduxProvider>
            </SnackbarProvider>
        </ApolloWrapper>
    </body>
    </html>
  );
}
