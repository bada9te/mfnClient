import './App.scss';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Login, Logout, Register, NotFound404, MainPage, Profile, ProfileEdit, Battles, Support, FAQ, AccountRestore, PostUpload, Container, Track, SavedPosts, Notifications, AccountRestoreEmailCheck, AccountVerify } from './pages/pages';
import { useEffect, useState } from 'react';
import { store } from './redux/store';
import { id } from './components/baseSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import * as Alert from './components/alerts/alerts';
import axios from 'axios';



function App() {
  const navigate = useNavigate();
  const themeStyle = useSelector(state => state.base.theme);
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
          }
        });
    } else if (location.pathname !== '/' && !regAllowed.test(location.pathname)) {
      navigate('/login');
    }
  }, [location.pathname, navigate, regAllowed]);


  useEffect(() => {
    // AXIOS SETUP
    axios.defaults.withCredentials = true;
    axios.interceptors.response.use(
        response => {
            return response;
        }, 
        error => {
            if (error.response.status === 401) {
                localStorage.removeItem("mfnCurrentUser");
                navigate('/login');
                Alert.alertWarning('Session expired, pls re-login');
            }
            return error;
        }
    )
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

