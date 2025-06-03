import React from 'react';
import '../styles/LoginButton.css';

const LoginButton = ({ onLogin }) => {
  return (
    <button className="login-btn" onClick={onLogin}>
      Login with Google
    </button>
  );
};

export default LoginButton;
