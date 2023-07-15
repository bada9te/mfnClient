import BattleItem from "../common/battle-item/battle-item";
import PostItem from "../common/post-item/post-item";
import getTimeSince from "../../common-functions/getTimeSince";
import { useSelector } from "react-redux";
import Spinner from "../common/spinner/Spinner";
import { Box, Typography } from "@mui/material";



const EnumBattles = props => {
    const { makeBatlleVote } = props;
    const locations = useSelector(state => state.base.locations);
    const battles = useSelector(state => state.battlesContainer.battles);
    const isLoading = useSelector(state => state.battlesContainer.isLoading);
    const page = useSelector(state => state.battlesContainer.page);



    return (
        <>
            {
                (() => {
                    if (isLoading) {
                        return (
                            <Box sx={{m: 3, height: '70vh', display: 'flex', alignItems: 'center'}}>
                                <Spinner/>
                            </Box> 
                        );
                    } else if (battles.length === 0) {
                        return (
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh'}}>
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
                                    title={item.title}
                                    post1={
                                        <PostItem 
                                            id={item.post1._id}
                                            user={[
                                                item.post1.owner._id, 
                                                item.post1.owner.nick, 
                                                `${locations?.images}/${item.post1.owner.avatar}`,
                                            ]}
                                            createdAt={getTimeSince(new Date(item.post1.createdAt)) + ' ago'}
                                            title={item.post1.title} 
                                            description={item.post1.description}
                                            img={`${locations?.images}/${item.post1.image}`}
                                            audio={`${locations?.audios}/${item.post1.audio}`}
                                            likedBy={item.post1.likedBy}
                                            savedBy={item.post1.savedBy}
                                            comments={item.post1.comments}
                                            status={page === "In Progress" ? "voting" : null}
                                            profileLinkAccessable={true}
                                            commentsAllowed={item.post1.commentsAllowed}
                                            downloadsAllowed={item.post1.downloadsAllowed}

                                            battleId={item._id}
                                            makeBatlleVote={makeBatlleVote}
                                            postNScore="post1Score"
                                        />
                                    }
                                    post2={
                                        <PostItem 
                                            id={item.post2._id}
                                            user={[
                                                item.post2.owner._id, 
                                                item.post2.owner.nick, 
                                                `${locations?.images}/${item.post2.owner.avatar}`,
                                            ]}
                                            createdAt={getTimeSince(new Date(item.post2.createdAt)) + ' ago'}
                                            title={item.post2.title} 
                                            description={item.post2.description}
                                            img={`${locations?.images}/${item.post2.image}`}
                                            audio={`${locations?.audios}/${item.post2.audio}`}
                                            likedBy={item.post2.likedBy}
                                            savedBy={item.post2.savedBy}
                                            comments={item.post2.comments}
                                            status={page === "In Progress" ? "voting" : null}
                                            profileLinkAccessable={true}
                                            commentsAllowed={item.post2.commentsAllowed}
                                            downloadsAllowed={item.post2.downloadsAllowed}

                                            battleId={item._id}
                                            makeBatlleVote={makeBatlleVote}
                                            postNScore="post2Score"
                                        />
                                    }
                                    createdAt={item.createdAt}
                                    willFinishAt={item.willFinishAt}
                                    post1Score={item.post1Score}
                                    post2Score={item.post2Score}
                                    bg1={`${locations?.images}/${item.post1.image}`}
                                    bg2={`${locations?.images}/${item.post2.image}`}
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