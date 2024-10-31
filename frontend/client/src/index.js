import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import 'react-toastify/dist/ReacToastify.css';
import {login} from './components/Login';
import {Signup} from './components/Signup';
import {Home} from './components/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} /> {/* Use RouterProvider to render appRouter */}
  </React.StrictMode>
);