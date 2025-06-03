
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import AuthProvider from './context/AuthProvider';
import useAuth from './hooks/useAuth';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CampaignList from './components/CampaignList';
import CampaignStatsDashboard from './components/CampaignStatsDashboard';
// import NotFound from './pages/NotFound';

import './App.css';


const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/campaigns/:id"
              element={
                <ProtectedRoute>
                  <CampaignList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stats"
              element={
                <ProtectedRoute>
                  <CampaignStatsDashboard />
                </ProtectedRoute>
              }
              />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
