import AppBar from "@/app/[lang]/components/bars/appbar";
import BottomNav from "./components/bars/bottom-nav";
import Footer from "@/app/[lang]/components/common/footer/footer";
import NextTopLoader from "nextjs-toploader";
import { getDictionary } from "@/app/translations/dictionaries";
import { TLang } from "@/app/types/language";
import AvatarGrid from "@/app/[lang]/components/common/avatar-grid/avatar-grid";
import WeAreUsingCookiesModal from "./components/cookie-info-modal";
import AlternativeAppbar from "@/app/[lang]/components/bars/alternative-appbar";
import PlayerModal from "./components/modals/player-modal";

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: {lang: TLang}
}>) {
    const dict = await getDictionary(params.lang)
  return (
    <div className="min-h-screen flex flex-col">
        {/* AppBar */}
        <div className="block lg:hidden bg-gray-800 text-base-content">
            {/* AppBar content goes here */}
            <AppBar dictionary={dict.components}/>
        </div>
            
        {/* Grid layout */}
        <div className="flex-1 grid grid-cols-[auto_1fr_auto] lg:grid-cols-[320px_auto_120px] grid-rows-1 overflow-hidden">
            {/* Left sidebar (hidden on smaller screens) */}
            <div className="hidden lg:block col-start-1 col-end-2 z-10">
                <div className="card h-screen fixed w-[120px] lg:w-[320px]">
                    <div className="flex flex-col gap-4 py-6 pl-4 no-scrollbar h-full">
                        <AlternativeAppbar dictionary={dict.components}/>
                    </div>
                </div>
            </div>

            {/* Main content area */}
            <div className="col-start-2 col-end-3 flex-1">
                <div className="card w-full my-14 lg:my-2">
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
                        />
                        {children}
                        <div className="p-2 pb-4 md:p-4">
                            <Footer dictionary={dict.components}/>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Right sidebar (hidden on smaller screens) */}
            <div className="hidden lg:block col-start-3 col-end-4">
                <div className="card w-[100px] h-screen fixed">
                    <div className="overflow-y-auto flex-col py-6 no-scrollbar h-full">
                        <AvatarGrid dictionary={dict.components}/>
                    </div>
                </div>
            </div>
        </div>

        {/* Bottom navigation bar */}
        <div className="block lg:hidden bg-gray-800 text-base-content">
            {/* BottomNav content goes here */}
            <BottomNav dictionary={dict.components}/>
        </div>

        <PlayerModal dictionary={dict.components}/>
        <WeAreUsingCookiesModal/>
    </div>
  );
}
