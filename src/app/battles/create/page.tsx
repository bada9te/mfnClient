import BarTabsBattles from "@/components/bars/bar-tabs/bar-tabs-battles";

export default function Battles() {
    return (
        <div className="flex flex-wrap gap-5 justify-center">
            <BarTabsBattles activeTab="create"/>
            CREATE BATTLE FORM
        </div>
    );
}