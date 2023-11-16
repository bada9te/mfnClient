import BattleItem from "../common/battle-item/battle-item";
import PostItem from "../common/post-item/post-item";
import getTimeSince from "../../common-functions/getTimeSince";
import { useSelector } from "react-redux";
import { SpinnerLinear } from "../common/spinner/Spinner";
import { Box, Typography } from "@mui/material";
import PostItemUnavailable from "../common/post-item/post-item-unavailable";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../baseReactive";


const PostFromData = (props) => {
    const { data, battleId, makeBattleVote, votedBy, finished } = props;
    const { locations } = useReactiveVar(baseState);

    return (
        <>
            {
                data?._id && data._id !== ""
                ?
                <PostItem
                    base={{
                        ...data, 
                        ownerAvatar: `${locations?.images}/${data.owner.avatar}`,
                        createdAt: getTimeSince(new Date(data.createdAt)) + ' ago',
                        img: `${locations?.images}/${data.image}`,
                        audio: `${locations?.audios}/${data.audio}`,
                    }}

                    addons={{
                        status: !finished ? "voting" : null,
                        profileLinkAccessable: true,
                        commentsAllowed: data.commentsAllowed,
                        downloadsAllowed: data.downloadsAllowed,
                        battleId: battleId,
                        makeBattleVote: makeBattleVote,
                        postNScore: "post1Score",
                        votedBy: votedBy,
                    }}
                />
                :
                <PostItemUnavailable/>
            }
        </>
    );
}


const EnumBattles = props => {
    const { makeBattleVote, battles, loading } = props;

    return (
        <>
            {
                (() => {
                    if (loading) {
                        return (
                            <SpinnerLinear/>
                        );
                    } else if (battles?.length === 0) {
                        return (
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh'}}>
                                <Typography>
                                    No battles found
                                </Typography>
                            </Box>
                        );
                    } else {
                        return battles.map((item, key) => {
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
                                    createdAt={item.createdAt}
                                    willFinishAt={item.willFinishAt}
                                    post1Score={item.post1Score}
                                    post2Score={item.post2Score}
                                    winner={item?.winner}
                                    finished={item?.finished}
                                />
                            );
                        })
                    }
                })()
            }
        </>
    );
}

export default EnumBattles;