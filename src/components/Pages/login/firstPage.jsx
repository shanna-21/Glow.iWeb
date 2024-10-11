import React, { useState } from 'react';
import LoginPage from './login';
import SignUpPage from './signup';
import './firstPage.css'

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
  };

  const switchToLogin = () => {
    setIsLogin(true); // Set the state to true to show the login form
  };

  return (
    <div className="auth-wrapper">
      {isLogin ? (
        <LoginPage toggleForm={toggleForm} />
      ) : (
        <SignUpPage toggleForm={toggleForm} switchToLogin={switchToLogin} />
      )}
    </div>
  );
};

export default Authentication;
