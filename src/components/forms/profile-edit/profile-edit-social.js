import { useReactiveVar } from "@apollo/client";
import { Facebook, Google, Twitter } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { baseState } from "../../baseReactive";

const ProfileEditPartSocial = props => {
    const { user: currentUser } = useReactiveVar(baseState);


    return (
        <Stack useFlexGap flexWrap="wrap" spacing={2}>
            <Button 
                variant="contained" 
                startIcon={<Google/>} 
                sx={{ boxShadow: 10, backgroundColor: '#db373b', ':hover': { backgroundColor: '#912326' } }} 
                href={ currentUser.google.email.length ? process.env.REACT_APP_GOOGLE_UNLINK : process.env.REACT_APP_GOOGLE_CONNECT }
            >
                { currentUser.google.email   !== '' ? `Unlink ${currentUser.google.email}`   : "Connect" }
            </Button>
            <Button 
                variant="contained" 
                startIcon={<Twitter/>} 
                sx={{ boxShadow: 10, backgroundColor: '#009ae4', ':hover': { backgroundColor: '#016391' } }}
                href={ currentUser.twitter.email.length ? process.env.REACT_APP_TWITTER_UNLINK : process.env.REACT_APP_TWITTER_CONNECT }
            >
                { currentUser.twitter.email  !== '' ? `Unlink ${currentUser.twitter.email}`  : "Connect" }
            </Button>
            <Button 
                variant="contained" 
                startIcon={<Facebook/>} 
                sx={{ boxShadow: 10, backgroundColor: '#0872f8', ':hover': { backgroundColor: '#034aa3' } }}
                href={ currentUser.facebook.email.length ? process.env.REACT_APP_FACEBOOK_UNLINK : process.env.REACT_APP_FACEBOOK_CONNECT }
            >
                { currentUser.facebook.email !== '' ? `Unlink ${currentUser.facebook.email}` : "Connect" }
            </Button>
        </Stack>
    );
}

export default ProfileEditPartSocial;