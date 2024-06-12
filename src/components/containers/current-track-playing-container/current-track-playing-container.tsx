import {Avatar, Box, Button, Skeleton, Stack, Typography, useTheme} from "@mui/material";
import {
    currentTrackPlayingContainerState,
} from "@/components/containers/current-track-playing-container/reactive.ts";
import ProfileCard from "@/components/common/profile/profile-card/profile-card.tsx";
import {User} from "@/utils/graphql-requests/generated/schema.ts";


export default function CurrentTrackPlayingContainer() {
    const { post, owner } = currentTrackPlayingContainerState();

    return (
        <Stack spacing={2} p={2}>
            {

                <ProfileCard id={owner?._id as string} prefetchedUser={owner as User} inRightBar/>


            }
        </Stack>
    );
}