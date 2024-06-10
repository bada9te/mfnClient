import {Stack} from "@mui/material";
import PostItemUnavailable from "@/components/common/post-item/post-item-unavailable.tsx";

export default function PostsContainerSkeleton() {
    return (
        <Stack
            spacing={2}
            sx={{
                width: '100%',
                p: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
            }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
        >
            <PostItemUnavailable hideText/>
            <PostItemUnavailable hideText/>
            <PostItemUnavailable hideText/>
            <PostItemUnavailable hideText/>
            <PostItemUnavailable hideText/>
            <PostItemUnavailable hideText/>
            <PostItemUnavailable hideText/>
            <PostItemUnavailable hideText/>
            <PostItemUnavailable hideText/>
        </Stack>
    );
}