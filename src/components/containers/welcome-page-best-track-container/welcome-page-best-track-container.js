import { Stack, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { POST_QUERY } from "../../../graphql-requests/posts";
import PostGenerate from "../../common/post-item/post-generate";
import PostItemUnavailable from "../../common/post-item/post-item-unavailable";
import WelcomePageBestTrackBG from "../../../images/bgs/welcomePageBestTrack.png"

const WelcomePageBestTrackContainer = props => {
    const { data, loading } = useQuery(POST_QUERY, { variables: { _id: '652146115bf7efe9bfb0b8a6' } });

    return (
        <Stack 
            sx={{ 
                height: 'calc(100vh - 120px)', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundImage: `url(${WelcomePageBestTrackBG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                scrollSnapAlign: 'start',
            }} 
            spacing={5} 
            direction="column">
            <Typography variant="h3" textAlign="center">Best track of the week</Typography>
            { !loading && data?.post ?  <PostGenerate item={data.post}/> : <PostItemUnavailable/>}
        </Stack>
    );
}

export default WelcomePageBestTrackContainer;