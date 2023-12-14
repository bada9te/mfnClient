import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Welcome, Login, Logout, Register, NotFound404, MainPage, Profile, ProfileEdit, Battles, Support, FAQ, AccountRestore, PostUpload, Container, Track, SavedPosts, Notifications, AccountRestoreEmailCheck, AccountVerify, Playlists } from './pages/pages';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useReactiveVar } from '@apollo/client';
import { baseState } from './components/baseReactive';
import { SnackbarProvider } from 'notistack';
import { httpGetCurrentUser } from './http-requests/auth';
import { postsContainerState } from './components/containers/posts-container/reactive';




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
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 25,
            padding: 10
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            '& fieldset': {
              borderRadius: 25
            }
          },
        }
      },
    }
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
            <Route path='/'            element={<Container/>}>
              <Route path='/' element={<Welcome/>}/>
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
              <Route path='/app/*'               element={<NotFound404/>}/>
            </Route>
          </Routes>
        </SnackbarProvider>
      </ThemeProvider>
  );
}

export default App;

