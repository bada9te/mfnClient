import Footer from "@/components/common/footer/footer";

export default function CentralBlock({children}: {
    children?: React.ReactNode;
}) {
    return (
        <div className="col-span-5 xl:col-span-3 flex-1">
            <div className="card bg-base-100 shadow-xl w-full main-layout-card rounded-none">
                <div className="card-body overflow-y-auto p-0 gap-0 thin-scrollbar">
                    {children}
                    <Footer/>
                </div>
            </div>
        </div>
    );
}