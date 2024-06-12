import { Routes, Route } from 'react-router-dom';
import { Welcome, Login, Logout, Register, NotFound404, MainPage, Profile, ProfileEdit, Battles, Support, FAQ, AccountRestore, PostUpload, Container, Track, SavedPosts, Notifications, AccountRestoreEmailCheck, AccountVerify, Playlists, Categories, Chats } from '../../pages/pages';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client/index.js';
import { baseState, userInitialState } from '@/components/baseReactive';
import { httpGetCurrentUser } from '@/utils/http-requests/auth';
import socket from '@/utils/socket/socket';
import muiTheme from "@/utils/mui-theme/theme.ts";
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';


const publicAvailablePages = [
    'profile',
    'track',
    'register',
    'account-restore',
    'account-verify',
    'battles',
    'support',
    'logout',
    'f.a.q',
    'playlists',
]

export default function ApplicationRoutes() {

    //const navigate = useNavigate();
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = baseState();

    const { theme: themeMode } = useReactiveVar(baseState);

    useEffect(() => {
        httpGetCurrentUser()
            .then(({data}) => {
                if (data) {
                    baseState({ ...baseState(), user: {...baseState().user, ...data}});
                    socket.auth = { userId: data._id };
                    socket.connect();
                } else {
                    (publicAvailablePages.includes(location.pathname) &&
                        !['/app', '/'].includes(location.pathname)) &&
                    navigate('/app/login');
                }
            }).catch(() => {
            console.log("Not authenticated!");
            if (user._id.length) {
                baseState({...baseState(), user: userInitialState });
                console.log("User state was restored.");
            }
        });
    }, [navigate, location.pathname, user._id]);


    return (
        <ThemeProvider theme={muiTheme(themeMode)}>
            <SnackbarProvider maxSnack={5}>
                <Routes>
                    <Route path='/' element={<Container/>}>
                        <Route path='/' element={<Welcome/>}/>
                        <Route path='/app/login' element={<Login/>}/>
                        <Route path='/app/logout' element={<Logout/>}/>
                        <Route path='/app/register' element={<Register/>}/>
                        <Route path='/app/account-verify/:userId/:actionId/:verifyToken/:type' element={<AccountVerify/>}/>
                        <Route path='/app/account-restore/:userId/:actionId/:verifyToken/:type' element={<AccountRestore/>}/>
                        <Route path='/app/account-restore/email-check' element={<AccountRestoreEmailCheck/>}/>
                        <Route path='/app' element={<MainPage/>}/>
                        <Route path='/app/saved' element={<SavedPosts/>}/>
                        <Route path='/app/profile/:id' element={<Profile/>}/>
                        <Route path='/app/profile-edit' element={<ProfileEdit/>}/>
                        <Route path='/app/battles' element={<Battles/>}/>
                        <Route path='/app/post-upload' element={<PostUpload/>}/>
                        <Route path='/app/track/:id/:owner' element={<Track/>}/>
                        <Route path='/app/support' element={<Support/>}/>
                        <Route path='/app/f.a.q' element={<FAQ/>}/>
                        <Route path='/app/notifications' element={<Notifications/>}/>
                        <Route path='/app/playlists' element={<Playlists/>}/>
                        <Route path='/app/categories' element={<Categories/>}/>
                        <Route path='/app/chats' element={<Chats/>}/>
                        <Route path='/app/*' element={<NotFound404/>}/>
                    </Route>
                </Routes>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

