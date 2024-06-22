import BarTabsBattles from "@/components/bars/bar-tabs/bar-tabs-battles";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import BattlesContainer from "@/components/containers/battles-container/battles-container";

export default function Battles({params}: {params: {page: number}}) {
    return (
        <>
            <BarTabsBattles activeTab="finished"/>
            <HeroWrapper
                title="Finished battles"
                description="Battles finished description"
            >
                <div className="card w-full">
                    <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-between items-center w-full gap-10">
                        <BattlesContainer
                            offset={(params.page - 1) * 12}
                            limit={12}
                            finished={true}
                        />
                    </div>
                </div>
            </HeroWrapper>
        </>
    );
}