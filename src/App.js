import './App.scss';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Login, Logout, Register, NotFound404, MainPage, Profile, ProfileEdit, Battles, Support, FAQ, AccountRestore, PostUpload, Container, Track, SavedPosts, Notifications, AccountRestoreEmailCheck, AccountVerify, Playlists } from './pages/pages';
import { useEffect, useState } from 'react';
import { store } from './redux/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
//import * as Alert from './components/alerts/alerts';
import { fetchUnreadNotifications } from './components/containers/notifications-container/notificationsContainerSlice';
import './requests/setupAxios';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { baseState } from './components/baseReactive';
import { USER_QUERY } from './graphql/users';



function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [regAllowed] = useState(/\/(profile|track|register|account-restore|account-verify|battles|support|logout|f.a.q|playlists)\/*/);

  const { 
    theme: themeStyle,
    user 
  } = useReactiveVar(baseState);
  const [getUserById, { data, loading }] = useLazyQuery(USER_QUERY);
  
  // theme setup
  const theme = createTheme({
    palette: {
      mode: themeStyle,
      primary : {
        main: '#1C94A4',
        light: '#42a5f5',
        dark: '#257a76',
        contrastText: '#fff',
      },
    },
  });

  useEffect(() => {
    if (user._id === "") {
      let currentUserId = localStorage.getItem('mfnCurrentUser') ? JSON.parse(localStorage.getItem('mfnCurrentUser'))._id : null;
      if (currentUserId) {
        getUserById({ variables: { _id: currentUserId } })
          .then(({data}) => {
            baseState({ ...baseState(), user: data.user });
          })
          .catch(error => {
            navigate('/login');
          });
      } else if (location.pathname !== '/' && !regAllowed.test(location.pathname)) {
        navigate('/login');
      }
    }
  }, [location.pathname, navigate, regAllowed]);


  return (
      <ThemeProvider theme={theme}>
        <Routes>
          {/* ACCOUNT MGMT */}
          <Route path='/login'     element={<Login/>}/>
          <Route path='/logout'    element={<Logout/>}/>
          <Route path='/register'  element={<Register/>}/>
          <Route path='/account-verify/:userId/:actionId'                      element={<AccountVerify/>}/>
          <Route path='/account-restore/:userId/:actionId/:verifyToken/:type'  element={<AccountRestore/>}/>
          <Route path='/account-restore/email-check'                           element={<AccountRestoreEmailCheck/>}/>

          {/* APP */}
          <Route path='/'                element={<Container/>}>
            <Route path='/'                element={<MainPage/>}/>
            <Route path='/saved'           element={<SavedPosts/>}/>
            <Route path='/profile/:id'     element={<Profile/>}/>
            <Route path='/profile-edit'    element={<ProfileEdit/>}/>
            <Route path='/battles'         element={<Battles/>}/>
            <Route path='/post-upload'     element={<PostUpload/>}/>
            <Route path='/track/:id'       element={<Track/>}/>
            <Route path='/support'         element={<Support/>}/>
            <Route path='/f.a.q'           element={<FAQ/>}/>
            <Route path='/notifications'   element={<Notifications/>}/>
            <Route path='/playlists'       element={<Playlists/>}/>
            <Route path='/*'               element={<NotFound404/>}/>
          </Route>
        </Routes>
      </ThemeProvider>
  );
}

export default App;

