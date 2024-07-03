import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProtectedRoute from "./components/protectedRoute"
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import Dashboard from "./pages/dashboard/Dashboard";
import AnalyticsPage from "./pages/analytics/AnalyticsPage"
import Settings from './pages/settings/Settings';
import DeleteModal from './modals/deleteModal/DeleteModal';
import PublicPage from './pages/publicPage/PublicPage';

function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ProtectedRoute Component={Dashboard} />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/delete" element={<DeleteModal />} />
        <Route path="/task/:taskId" element={<PublicPage />} />
        </Routes>
   </BrowserRouter>
  );
}

export default App;