import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';
import "react-chat-elements/dist/main.css"
import { BrowserRouter } from 'react-router-dom';

// rainbowkit
import RainbowkitAppProvider from './utils/rainbowkit/rainbowkitProvider';

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
import React from "react";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ApolloProvider client={APClient}>
          <RainbowkitAppProvider>
              <I18nextProvider i18n={i18next}>
                  <BrowserRouter>
                      <App />
                  </BrowserRouter>
              </I18nextProvider>
          </RainbowkitAppProvider>
      </ApolloProvider>
  </React.StrictMode>,
)






