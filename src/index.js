import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import Provider from './context/Provider';
import { Provider as Redux } from 'react-redux';
import './index.css';
import App from './App';
import './styles/styles.css';
import store from './redux';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router> 
        <Redux store={ store }>
            <Provider>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </Provider>
        </Redux>
    </Router>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals