import Battle from "@/components/entities/battle/battle";
import Post from "@/components/entities/post/post";
import BattleSkeleton from "@/components/entities/battle/battles-skeleton";
import {useBattlesByStatusQuery} from "@/utils/graphql-requests/generated/schema";

export default function BattlesContainer(props: {
    offset: number;
    limit: number;
    finished: boolean;
}) {
    const {offset, limit, finished} = props;

    const {data, loading} = useBattlesByStatusQuery({
        variables: {
            offset, limit, finished
        }
    });

    return (
        <>
            <Battle post1={<Post/>} post2={<Post/>}/>
            <Battle post1={<Post/>} post2={<Post/>}/>
        </>
    );
}