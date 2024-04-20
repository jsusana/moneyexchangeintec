import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import LoginPage from './views/loginPage';
import HomePage from './views/homepage';
import ReportsPage from './views/reportsPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
