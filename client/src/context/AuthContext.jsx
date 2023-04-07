import { createContext, useCallback, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthLoaded: false,
    authDetails: null,
  });

  const getAuthDetails = useCallback(async () => {
    try {
      const result = await axios({
        method: 'get',
        withCredentials: true,
        url: `http://localhost:3003/api/current-user`,
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Hello logging result: ', result.data);
      if (result.data) {
        setAuth({ isAuthLoaded: true, authDetails: result.data });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAuthDetails();
  }, [getAuthDetails]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
