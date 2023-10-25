import ProfileCard from "../../components/common/profile/profile-card/profile-card";
import PostsContainer from "../../components/containers/posts-container/posts-container";
import BaseContentContainer from "../../components/containers/base-content-container/base-content-container";
import { useParams } from 'react-router-dom';


const Profile = (props) => {
    const { id } = useParams();

    return (
        <BaseContentContainer>
            <ProfileCard id={id}/>
            <PostsContainer id={id} profileLinkAccessable={false}/>
        </BaseContentContainer>
    );
}

export default Profile;