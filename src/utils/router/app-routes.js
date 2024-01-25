import { Routes, Route } from 'react-router-dom';
import { Welcome, Login, Logout, Register, NotFound404, MainPage, Profile, ProfileEdit, Battles, Support, FAQ, AccountRestore, PostUpload, Container, Track, SavedPosts, Notifications, AccountRestoreEmailCheck, AccountVerify, Playlists, Categories, Chats } from '../../pages/pages';

const ApplicationRoutes = props => {
    return (
        <Routes>
            <Route path='/'            element={<Container/>}>
                <Route path='/'              element={<Welcome/>}/>
                <Route path='/app/login'     element={<Login/>}/>
                <Route path='/app/logout'    element={<Logout/>}/>
                <Route path='/app/register'  element={<Register/>}/>
                <Route path='/app/account-verify/:userId/:actionId'                      element={<AccountVerify/>}/>
                <Route path='/app/account-restore/:userId/:actionId/:verifyToken/:type'  element={<AccountRestore/>}/>
                <Route path='/app/account-restore/email-check'                           element={<AccountRestoreEmailCheck/>}/>
                <Route path='/app'             element={<MainPage/>}/>
                <Route path='/app/saved'           element={<SavedPosts/>}/>
                <Route path='/app/profile/:id'     element={<Profile/>}/>
                <Route path='/app/profile-edit'    element={<ProfileEdit/>}/>
                <Route path='/app/battles'         element={<Battles/>}/>
                <Route path='/app/post-upload'     element={<PostUpload/>}/>
                <Route path='/app/track/:id/:owner'element={<Track/>}/>
                <Route path='/app/support'         element={<Support/>}/>
                <Route path='/app/f.a.q'           element={<FAQ/>}/>
                <Route path='/app/notifications'   element={<Notifications/>}/>
                <Route path='/app/playlists'       element={<Playlists/>}/>
                <Route path='/app/categories'      element={<Categories/>}/>
                <Route path='/app/chats'           element={<Chats/>}/>
                <Route path='/app/*'               element={<NotFound404/>}/>
            </Route>
        </Routes>
    );
}

export default ApplicationRoutes;