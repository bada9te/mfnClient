"use client"
import Footer from "@/components/common/footer/footer";
import { getDictionary } from "@/dictionaries/dictionaries";

export default function CentralBlock({children, dictionary}: {
    children?: React.ReactNode;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    return (
        <div className={`col-auto flex-1`}>
            <div className="card shadow-xl w-full main-layout-card  glass">
                <div className="card-body overflow-y-auto p-0 gap-0 thin-scrollbar">
                    {children}
                    <Footer dictionary={dictionary}/>
                </div>
            </div>
        </div>
    );
}