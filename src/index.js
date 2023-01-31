import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './app/Utils/reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import * as serviceWorker from './app/Utils/Services/serviceWorker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
serviceWorker.unregister();

