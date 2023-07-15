import ProfileCard from "../../components/common/profile/profile-card/profile-card";
import PostsContainer from "../../components/containers/posts-container/posts-container";
import { useParams } from 'react-router-dom';


const Profile = (props) => {
    const { id } = useParams();

    return (
        <>
            <ProfileCard id={id}/>
        
            <PostsContainer id={id} profileLinkAccessable={false}/>
        </>
    );
}

export default Profile;