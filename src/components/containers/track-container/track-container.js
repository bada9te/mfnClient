import ProfileCard from "../../common/profile/profile-card/profile-card";
import PostItem from "../../common/post-item/post-item";
import getTimeSince from "../../../common-functions/getTimeSince";
import { SpinnerCircular } from "../../common/spinner/Spinner";
import { Box, Stack } from "@mui/material";
import { useQuery, useReactiveVar } from "@apollo/client";
import { POST_QUERY } from "../../../graphql-requests/posts";
import { baseState } from "../../baseReactive";


const TrackContainer = (props) => {
    const { trackId } = props;
    const { locations } = useReactiveVar(baseState);

    const { data, loading } = useQuery(POST_QUERY, {
        variables: {
            _id: trackId,
        },
    });


    return (
        <>
            {
                (() => {
                    if (loading || !data?.post) {
                        return (
                            <Box sx={{mt: 3, mb: 5, minHeight: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <SpinnerCircular/>
                            </Box>
                        );
                    } else {
                        return (
                            <Stack sx={{ 
                                py: 3, 
                                m: {xs: 0, md: 1.5}, 
                                display: 'flex', 
                                justifyContent: 'space-around', 
                                alignItems: 'center', 
                                boxShadow: 15,
                                borderRadius: 5
                            }} flexWrap="wrap" spacing={2} direction="row" useFlexGap>
                                <PostItem 
                                    base={{
                                        ...data.post, 
                                        ownerAvatar: `${locations?.images}/${data.post.owner.avatar}`,
                                        createdAt: getTimeSince(new Date(data.post.createdAt)) + ' ago',
                                        img: `${locations?.images}/${data.post.image}`,
                                        audio: `${locations?.audios}/${data.post.audio}`,
                                    }}
                                    addons={{
                                        commentsAllowed: data.post.commentsAllowed,
                                        downloadsAllowed: data.post.downloadsAllowed,
                                        status: null,
                                        profileLinkAccessable: true,
                                    }}
                                    id={data.post._id}
                                    user={[
                                        data.post.owner._id, 
                                        data.post.owner.nick, 
                                        `${locations?.images}/${data.post.owner.avatar}`,
                                    ]}
                                />
                                
                                <ProfileCard id={data.post.owner._id} bgRadius={5}/>
                            </Stack>
                        );
                    }
                })()
            }
        </>
    );
}

export default TrackContainer;