import './App.scss';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Login, Logout, Register, NotFound404, MainPage, Profile, ProfileEdit, Battles, Support, FAQ, AccountRestore, PostUpload, Container, Track, SavedPosts, Notifications, AccountRestoreEmailCheck, AccountVerify } from './pages/pages';
import { useEffect, useState } from 'react';
import { store } from './redux/store';
import { id, setToken } from './components/baseSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import * as Alert from './components/alerts/alerts';
import axios from 'axios';
import { fetchUnreadNotifications } from './components/containers/notifications-container/notificationsContainerSlice';
import { httpRefreshAccessToken } from './requests/auth';



function App() {
  const navigate = useNavigate();
  const themeStyle = useSelector(state => state.base.theme);
  const accessToken = useSelector(state => state.base.token.accessToken);
  const location = useLocation();
  
  const [regAllowed] = useState(/\/(profile|track|register|account-restore|account-verify|battles|support|logout)\/*/);


  // theme setup
  const theme = createTheme({
    palette: {
      mode: themeStyle,
    },
  });

  
  useEffect(() => {
    let currentUserId = localStorage.getItem('mfnCurrentUser') ? JSON.parse(localStorage.getItem('mfnCurrentUser')).id : null;
    
    if (currentUserId) {
      //console.log(currentUserId)
      store.dispatch(id(currentUserId))
        .then(unwrapResult)
        .then(result => {
          if (!result.data.done) {
            navigate('/login');
          } else {
            store.dispatch(fetchUnreadNotifications());
          }
        });
    } else if (location.pathname !== '/' && !regAllowed.test(location.pathname)) {
      navigate('/login');
    }
  }, [location.pathname, navigate, regAllowed]);


  useEffect(() => {
    // AXIOS SETUP
    // axios.defaults.headers.common['accesstoken'] = accessToken;
    axios.defaults.withCredentials = true;
    
    axios.interceptors.response.use(
        async(response) => {
          return response;
        }, 
        async(error) => {
          
          const originalRequest = error.config;
          console.log(error)
          if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
              const userData = JSON.parse(localStorage.getItem("mfnCurrentUser"));
              const result = await httpRefreshAccessToken(userData.id, userData.email);
              localStorage.setItem("mfnCurrentToken", JSON.stringify(result.data.token));
              axios.defaults.headers.common['Authorization'] = result.data.token.accessToken;
              return axios(originalRequest);
            } catch (error) {
              localStorage.removeItem("mfnCurrentUser");
              localStorage.removeItem("mfnCurrentToken");
              navigate('/login');
              Alert.alertWarning('Session expired, pls re-login');
              
              if (error.response && error.response.data) {
                return Promise.reject(error.response.data)
              }
              return Promise.reject(error);
            }
          }
          
          return error;
        }
    );
    
    axios.interceptors.request.use(async(config) => {
      config.headers = {
        Authorization: localStorage.getItem("mfnCurrentToken") ? JSON.parse(localStorage.getItem("mfnCurrentToken")).accessToken : "",
      }
      return config;
    });
    
    
    return () => {
      axios.interceptors.request.clear();
      axios.interceptors.response.clear();
    }

  }, [navigate]);


  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
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
            <Route path='/*'               element={<NotFound404/>}/>
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;

