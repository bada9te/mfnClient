import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import './Scrollbar.scss';
import { BrowserRouter } from 'react-router-dom';

// popup notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// apollo
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// root node
const root = ReactDOM.createRoot(document.getElementById('root'));

// ap-client
const client = new ApolloClient({
    uri: `${process.env.REACT_APP_SERVER_BASE}/graphql`,
    cache: new InMemoryCache(),
});

// render
root.render(
    <ApolloProvider client={client}>
        <ToastContainer />
        <BrowserRouter>
            <App />
        </BrowserRouter> 
    </ApolloProvider>
);

