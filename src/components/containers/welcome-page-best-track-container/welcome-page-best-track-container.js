import { Stack, Typography } from "@mui/material";
import { useLazyQuery } from "@apollo/client";
import { POSTS_MOST_POPULAR_BY_STARTDATE_QUERY } from "../../../utils/graphql-requests/posts";
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
        date.setDate(date.getDate() - 14);
        
        fetchMostpopularTracks({ variables: { date } });
    }, [fetchMostpopularTracks]);

    return (
        <Stack 
            sx={{ 
                height: { sm: 'fit-content', md: 'calc(100vh - 120px)' }, 
                minHeight: '100vh',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundImage: `url(${WelcomePageBestTrackBG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                scrollSnapAlign: 'start',
                py: 10
            }} 
            spacing={5} 
            direction="column">
            <Typography variant="h3" textAlign="center">{t('welcome.best_track')}</Typography>
            { 
                !loading && data?.postsMostPopular 
                ? 
                <Stack 
                    spacing={2} 
                    sx={{
                        width: '100%', 
                        py: 1.5, 
                        display: 'flex', 
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }} 
                    direction="row" 
                    useFlexGap 
                    flexWrap="wrap"
                >
                    <EnumPosts posts={data.postsMostPopular} profileLinkAccessable/> 
                </Stack>
                : 
                <PostItemUnavailable/>
            }
        </Stack>
    );
}

export default WelcomePageBestTrackContainer;