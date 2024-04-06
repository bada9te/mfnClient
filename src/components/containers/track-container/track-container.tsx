import ProfileCard from "../../common/profile/profile-card/profile-card";
import { SpinnerCircular } from "../../common/spinner/Spinner";
import { Box, Stack } from "@mui/material";
import PostGenerate from "../../common/post-item/post-generate";
import { Post, usePostQuery } from "utils/graphql-requests/generated/schema";
import { TPostAddons, TPostBase } from "components/common/post-item/types";


export default function TrackContainer(props: {
    trackId: string;
}) {
    const { trackId } = props;

    const { data, loading } = usePostQuery({
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
                                <PostGenerate item={data.post as unknown as (TPostBase & TPostAddons)} addonsCorrections={{}} baseCorrections={{}} />
                                
                                <ProfileCard id={data.post.owner._id} bgRadius={5}/>
                            </Stack>
                        );
                    }
                })()
            }
        </>
    );
}