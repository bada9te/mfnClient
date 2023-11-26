import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import './Scrollbar.scss';
import { BrowserRouter } from 'react-router-dom';

// apollo
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';

// root node
const root = ReactDOM.createRoot(document.getElementById('root'));

// ap-client
const client = new ApolloClient({
    link: new HttpLink({ uri: `${process.env.REACT_APP_SERVER_BASE}/graphql`, credentials: 'include' }),
    cache: new InMemoryCache(),
});

// render
root.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <App />
        </BrowserRouter> 
    </ApolloProvider>
);

