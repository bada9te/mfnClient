import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';
import "react-chat-elements/dist/main.css"
import { BrowserRouter } from 'react-router-dom';

// styles
import './styles/index.scss';
import './styles/muiOverrides.scss';
import './styles/Scrollbar.scss';
import './styles/chats.scss';
import React from "react";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </React.StrictMode>
)






