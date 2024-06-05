import ProfileCard from "@/components/common/profile/profile-card/profile-card";
import PostsContainer from "@/components/containers/posts-container/posts-container";
import BaseContentContainer from "@/components/containers/base-content-container/base-content-container";
import { useParams } from 'react-router-dom';
import { Box } from "@mui/material";


export default function Profile() {
    const { id } = useParams();


    return (
        <BaseContentContainer>
            <Box sx={{ p: 2 }}>
                <ProfileCard id={id as string}/>
            </Box>
            <PostsContainer id={id} profileLinkAccessable={false}/>
        </BaseContentContainer>
    );
}
