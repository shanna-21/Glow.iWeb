import React, { useState } from 'react';
import LoginPage from './login';
import SignUpPage from './signup';
import './firstPage.css'

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className="auth-wrapper">
      {isLogin ? <LoginPage toggleForm={toggleForm} /> : <SignUpPage toggleForm={toggleForm} />}
    </div>
  );
};

export default Authentication;
