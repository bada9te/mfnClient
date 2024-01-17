import ProfileCard from "../../common/profile/profile-card/profile-card";
import { SpinnerCircular } from "../../common/spinner/Spinner";
import { Box, Stack } from "@mui/material";
import { useQuery } from "@apollo/client";
import { POST_QUERY } from "../../../utils/graphql-requests/posts";
import PostGenerate from "../../common/post-item/post-generate";


const TrackContainer = (props) => {
    const { trackId } = props;

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
                                <PostGenerate item={data.post} />
                                
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