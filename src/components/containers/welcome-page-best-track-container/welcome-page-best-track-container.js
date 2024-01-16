import { Stack, Typography } from "@mui/material";
import { useLazyQuery } from "@apollo/client";
import { POSTS_MOST_POPULAR_BY_STARTDATE_QUERY } from "../../../graphql-requests/posts";
import PostItemUnavailable from "../../common/post-item/post-item-unavailable";
import WelcomePageBestTrackBG from "../../../images/bgs/welcomePageBestTrack.png"
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import EnumPosts from "../../enums/enum-posts";


const WelcomePageBestTrackContainer = props => {
    const [ fetchMostpopularTracks, { data, loading }] = useLazyQuery(POSTS_MOST_POPULAR_BY_STARTDATE_QUERY);
    const { t } = useTranslation("pages");
    
    useEffect(() => {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        
        fetchMostpopularTracks({ variables: { date } });
    }, [fetchMostpopularTracks]);

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
            <Typography variant="h3" textAlign="center">{t('welcome.best_track')}</Typography>
            { !loading && data?.postsMostPopular ? <EnumPosts posts={data.postsMostPopular} profileLinkAccessable/> : <PostItemUnavailable/>}
        </Stack>
    );
}

export default WelcomePageBestTrackContainer;