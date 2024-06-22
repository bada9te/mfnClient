import Battle from "@/components/entities/battle/battle";
import Post from "@/components/entities/post/post";
import BattleSkeleton from "@/components/entities/battle/battles-skeleton";

export default function BattlesContainer() {
    return (
        <>
            <Battle post1={<Post/>} post2={<Post/>}/>
            <BattleSkeleton/>
        </>
    );
}