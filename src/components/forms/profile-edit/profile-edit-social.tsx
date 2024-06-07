import { useReactiveVar } from "@apollo/client/index.js";
import { Facebook, Google, Twitter } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { baseState } from "../../baseReactive";

export default function ProfileEditPartSocial() {
    const { user: currentUser } = useReactiveVar(baseState);


    return (
        <Stack useFlexGap flexWrap="wrap" spacing={2}>
            <Button 
                variant="contained" 
                color="secondary"
                startIcon={<Google/>} 
                sx={{ boxShadow: 10, backgroundColor: '#db373b', ':hover': { backgroundColor: '#912326' }, color: 'white' }} 
                href={ currentUser.google.email.length ? process.env.REACT_APP_GOOGLE_UNLINK : process.env.REACT_APP_GOOGLE_CONNECT }
            >
                { currentUser.google.email   !== '' ? `Unlink ${currentUser.google.email}`   : "Connect" }
            </Button>
            <Button 
                variant="contained" 
                color="secondary"
                startIcon={<Twitter/>} 
                sx={{ boxShadow: 10, backgroundColor: '#009ae4', ':hover': { backgroundColor: '#016391' }, color: 'white' }}
                href={ currentUser.twitter.email.length ? process.env.REACT_APP_TWITTER_UNLINK : process.env.REACT_APP_TWITTER_CONNECT }
            >
                { currentUser.twitter.email  !== '' ? `Unlink ${currentUser.twitter.email}`  : "Connect" }
            </Button>
            <Button 
                variant="contained" 
                color="secondary"
                startIcon={<Facebook/>} 
                sx={{ boxShadow: 10, backgroundColor: '#0872f8', ':hover': { backgroundColor: '#034aa3' }, color: 'white' }}
                href={ currentUser.facebook.email.length ? process.env.REACT_APP_FACEBOOK_UNLINK : process.env.REACT_APP_FACEBOOK_CONNECT }
            >
                { currentUser.facebook.email !== '' ? `Unlink ${currentUser.facebook.email}` : "Connect" }
            </Button>
        </Stack>
    );
}