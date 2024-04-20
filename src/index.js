import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import LoginPage from './views/loginPage';
import HomePage from './views/homepage';
import ClientsPage from './views/clientsPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/clients" element={<ClientsPage />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
