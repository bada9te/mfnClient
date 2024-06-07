import BattleItem from "../common/battle-item/battle-item";
import PostItemUnavailable from "../common/post-item/post-item-unavailable";
import PostGenerate from "../common/post-item/post-generate";
import { useReactiveVar } from "@apollo/client/index.js";
import { baseState } from "../baseReactive";
import { Battle, Post, User } from "utils/graphql-requests/generated/schema";


function PostFromData(props: {
    data: Post;
    battleId: string;
    makeBattleVote: (battleId: string, postNScore: "post1Score" | "post2Score", voteCount: number, voterId: string) => Promise<void>;
    votedBy: User[];
    finished: boolean;
    postNScore: "post1Score" | "post2Score"
}) {
    const { data, battleId, makeBattleVote, votedBy, finished, postNScore } = props;
    const { user: currentUser } = useReactiveVar(baseState);
 
    return (
        <>
            {
                data?._id && data._id !== ""
                ?
                <PostGenerate 
                    item={data} 
                    addonsCorrections={{ 
                        status: !finished && !votedBy.map(i => i._id).includes(currentUser._id) && currentUser._id.length ? "voting" : null,
                        battleId, makeBattleVote, postNScore, votedBy,
                    }}
                />
                :
                <PostItemUnavailable/>
            }
        </>
    );
}


export default function EnumBattles(props: {
    makeBattleVote: (battleId: string, postNScore: "post1Score" | "post2Score", voteCount: number, voterId: string) => Promise<void>;
    battles: Battle[];
}) {
    const { makeBattleVote, battles } = props;

    return (
        <>
            {
                battles.map((item, key) => {
                    return (  
                        <BattleItem 
                            key={key}
                            id={item._id}
                            title={item.title}
                            post1={
                                <PostFromData 
                                    data={item?.post1 as Post} 
                                    battleId={item?._id} 
                                    makeBattleVote={makeBattleVote}
                                    votedBy={item?.votedBy as User[]}
                                    finished={item?.finished}
                                    postNScore="post1Score"
                                />
                            }
                            post2={
                                <PostFromData 
                                    data={item?.post2 as Post} 
                                    battleId={item?._id} 
                                    makeBattleVote={makeBattleVote}
                                    votedBy={item?.votedBy as User[]}
                                    finished={item?.finished}
                                    postNScore="post2Score"
                                />
                            }
                            createdAt={+item.createdAt}
                            willFinishAt={+item.willFinishAt}
                            post1Score={item.post1Score}
                            post2Score={item.post2Score}
                            winner={item?.winner}
                            finished={item?.finished}
                        />
                    );
                })
            }
        </>
    );
}