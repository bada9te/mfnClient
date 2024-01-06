import BattleItem from "../common/battle-item/battle-item";
import PostItemUnavailable from "../common/post-item/post-item-unavailable";
import PostGenerate from "../common/post-item/post-generate";


const PostFromData = (props) => {
    const { data, battleId, makeBattleVote, votedBy, finished } = props;

    return (
        <>
            {
                data?._id && data._id !== ""
                ?
                <PostGenerate item={data} addonsCorrections={{ 
                    status: !finished ? "voting" : null,
                    battleId,
                    makeBattleVote,
                    postNScore: "post1Score",
                    votedBy,
                }}/>
                :
                <PostItemUnavailable/>
            }
        </>
    );
}


const EnumBattles = props => {
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
                                    data={item?.post1} 
                                    battleId={item?._id} 
                                    makeBattleVote={makeBattleVote}
                                    votedBy={item?.votedBy}
                                    finished={item?.finished}
                                />
                            }
                            post2={
                                <PostFromData 
                                    data={item?.post2} 
                                    battleId={item?._id} 
                                    makeBattleVote={makeBattleVote}
                                    votedBy={item?.votedBy}
                                    finished={item?.finished}
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

export default EnumBattles;