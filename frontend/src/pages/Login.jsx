import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import '../styles/Login.css';

const Login = () => {
  const { handleLoginSuccess } = useAuth(); // ✅ use context method
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome to <span>Xeno CRM</span></h1>
        <p className="login-subtitle">Please login using your Google account</p>
        <div className="login-button">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleLoginSuccess(credentialResponse); // ✅ update context
              navigate('/dashboard'); // ✅ redirect
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
