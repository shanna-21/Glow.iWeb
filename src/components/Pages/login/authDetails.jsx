import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../../Backend/config';
import { useNavigate } from 'react-router-dom';

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        navigate('/authenticated-home'); // Redirect to authenticated user's home
      } else {
        setAuthUser(null);
        navigate('/non-authenticated-home'); // Redirect to non-authenticated user's home
      }
    });

    // Clean up the listener when the component unmounts
    return () => listen();
  }, [navigate]);

  return (
    <div>
      {authUser ? <p>Signed In</p> : <p>Signed Out</p>}
    </div>
  );
};

export default AuthDetails;
