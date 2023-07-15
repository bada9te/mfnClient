import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import './Scrollbar.scss';

// popup notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// redux 
import { store } from './redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';



// APP
axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById('root'));


// render
root.render(
    <ReduxProvider store={store}>
        <ToastContainer />
        <BrowserRouter>
            <App />
        </BrowserRouter> 
    </ReduxProvider>
);

