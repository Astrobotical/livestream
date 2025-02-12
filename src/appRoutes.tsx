// src/Routes.tsx
import React from 'react';
import { BrowserRouter , Routes, Route, Outlet,redirect} from 'react-router-dom';
import HomePage from './pages/General/HomePage';
import AboutPage from './pages/General/AboutPage';
import GalleryPage from './pages/General/GalleryPage';
import LoginPage from './pages/General/LoginPage';
import NavBar from './components/Layout/navBar';
import StreamPage from './pages/General/StreamPage';
import DashBoardPage from './pages/Admin/DashboardPage';
import DashboardLayout from './pages/Admin/DashboardLayout';
import StreamSetUpPage from './pages/Admin/StreamSetUpPage';
import UsersPage from './pages/Admin/userPage';
import StreamCatalog from './pages/Admin/Streams/streamCatalogs';
import CreateStreamPage from './pages/Admin/Streams/createStream';
import SettingsPage from './pages/General/UserSettings';
import AuthenticationPage from './pages/Authentication/authenticationPage';
//import Footer from './components/Layout/bottomNavBar';
const StreamDefault = () =><Outlet></Outlet>
const AppRoutes = () => {
  return (
    <BrowserRouter>
    <>
      <NavBar /> 
       
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/authentication" element={<AuthenticationPage />} />
        <Route path="/stream" element={<StreamPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashBoardPage />} /> 
            <Route path="users" element={<UsersPage />} /> 
            <Route path="settings" element={<SettingsPage />} /> 
            <Route path="streamsetup"element={<StreamSetUpPage />} />
            <Route path="stream" element={<StreamDefault/>}>
              <Route path="setup" element={<CreateStreamPage/>} />
              <Route path="list" element={<StreamCatalog />} />
            </Route>
         </Route>
      </Routes>
      <Outlet />
    </>
  </BrowserRouter>
  );
};

export default AppRoutes;