import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useReactiveVar } from '@apollo/client';
import { baseState } from './components/baseReactive';
import { SnackbarProvider } from 'notistack';
import { httpGetCurrentUser } from './utils/http-requests/auth';
import ApplicationRouter from './utils/router/app-routes';
import muiTheme from './utils/mui-theme/theme';
import socket from './utils/socket/socket';



function App() {
  const navigate = useNavigate();
  //const location = useLocation();
  //const [regAllowed] = useState(/\/(profile|track|register|account-restore|account-verify|battles|support|logout|f.a.q|playlists)\/*/);

  const { theme: themeMode } = useReactiveVar(baseState);

  useEffect(() => {
    httpGetCurrentUser()
      .then(({data}) => {
        if (data.done) {
          baseState({ ...baseState(), user: {...baseState().user, ...data.user}});
          socket.auth = { userId: data.user._id };
          socket.on('message create', ({ message }) => {
            console.log(message)
          })
          socket.connect();

          
        } else {
          //navigate('/login');
        }
      });
  }, [navigate]);


  return (
    <ThemeProvider theme={muiTheme(themeMode)}>
      <SnackbarProvider maxSnack={5}>
        <ApplicationRouter/>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;

