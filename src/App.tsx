import React from 'react';
import NavBar from './components/Layout/navBar';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import HomePage from './pages/General/HomePage';
import AboutPage from './pages/General/AboutPage';
import GalleryPage from './pages/General/GalleryPage';
import LoginPage from './pages/General/LoginPage';
import StreamPage from './pages/General/StreamPage';
import DashBoardPage from './pages/Admin/DashboardPage';
import DashboardLayout from './pages/Admin/DashboardLayout'; 
import UsersPage from './pages/Admin/userPage';
import StreamCatalog from './pages/Admin/Streams/streamCatalogs';
import CreateStreamPage from './pages/Admin/Streams/createStream';
//import Footer from './components/Layout/bottomNavBar';
console.log("API URL", process.env.REACT_APP_API_BASE_URL);
const SettingsPage = () => <h2 className="text-2xl">Settings</h2>;
const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <>
          <NavBar />  {/* This should be inside BrowserRouter */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/stream" element={<StreamPage />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashBoardPage />} />  {/* Default Dashboard page */}
              <Route path="users" element={<UsersPage />} />  {/* /dashboard/users */}
              <Route path="settings" element={<SettingsPage />} />  {/* /dashboard/settings */}
              <Route path="/stream">
              <Route path="setup" element={<CreateStreamPage />} />
              <Route path="list" element={<StreamCatalog />} />
              </Route>
            
            </Route>
          </Routes>
          <Outlet />
        </>
      </BrowserRouter>
    </>
  );
};
export default App;