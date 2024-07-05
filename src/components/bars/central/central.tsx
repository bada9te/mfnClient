"use client"
import Footer from "@/components/common/footer/footer";

export default function CentralBlock({children}: {
    children?: React.ReactNode;
}) {
    return (
        <div className={`col-auto flex-1`}>
            <div className="card shadow-xl w-full main-layout-card rounded-none glass">
                <div className="card-body overflow-y-auto p-0 gap-0 thin-scrollbar">
                    {children}
                    <Footer/>
                </div>
            </div>
        </div>
    );
}