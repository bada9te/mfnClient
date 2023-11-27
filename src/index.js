import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import './Scrollbar.scss';
import { BrowserRouter } from 'react-router-dom';

// apollo
import { ApolloProvider } from '@apollo/client';
import APClient from './apollo/client';


// root node
const root = ReactDOM.createRoot(document.getElementById('root'));


// render
root.render(
    <ApolloProvider client={APClient}>
        <BrowserRouter>
            <App />
        </BrowserRouter> 
    </ApolloProvider>
);

