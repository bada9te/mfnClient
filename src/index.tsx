import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "react-chat-elements/dist/main.css"
import { BrowserRouter } from 'react-router-dom';

// apollo
import { ApolloProvider } from '@apollo/client';
import APClient from './utils/apollo/client';

// localization
import { I18nextProvider } from "react-i18next";
import i18next from "./translations/i18next";

// styles
import './styles/index.scss';
import './styles/muiOverrides.scss';
import './styles/Scrollbar.scss';
import './styles/chats.scss';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApolloProvider client={APClient}>
      <I18nextProvider i18n={i18next}>
          <BrowserRouter>
              <App />
          </BrowserRouter> 
      </I18nextProvider>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
