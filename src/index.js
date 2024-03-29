import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
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

// root node
const root = ReactDOM.createRoot(document.getElementById('root'));


// render
root.render(
    <ApolloProvider client={APClient}>
        <I18nextProvider i18n={i18next}>
            <BrowserRouter>
                <App />
            </BrowserRouter> 
        </I18nextProvider>
    </ApolloProvider>
);

