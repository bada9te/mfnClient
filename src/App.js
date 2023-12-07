import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Login, Logout, Register, NotFound404, MainPage, Profile, ProfileEdit, Battles, Support, FAQ, AccountRestore, PostUpload, Container, Track, SavedPosts, Notifications, AccountRestoreEmailCheck, AccountVerify, Playlists } from './pages/pages';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useReactiveVar } from '@apollo/client';
import { baseState } from './components/baseReactive';
import { SnackbarProvider } from 'notistack';
import { httpGetCurrentUser } from './http-requests/auth';




function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [regAllowed] = useState(/\/(profile|track|register|account-restore|account-verify|battles|support|logout|f.a.q|playlists)\/*/);

  const { theme: themeStyle } = useReactiveVar(baseState);

  
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
    httpGetCurrentUser()
      .then(({data}) => {
        if (data.done) {
          baseState({ ...baseState(), user: data.user });
        } else {
          //navigate('/login');
        }
      });
  }, [navigate]);


  return (
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={5}>
          
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
        </SnackbarProvider>
      </ThemeProvider>
  );
}

export default App;

