import { createContext, useCallback, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [authDetails, setAuthDetails] = useState('');

  const getAuthDetails = useCallback(async () => {
    try {
      const result = await axios({
        method: 'get',
        withCredentials: true,
        url: `http://localhost:3003/api/profile/current-user`,
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Hello logging result: ', result.data);
      if (result.data) {
        setAuthDetails(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getAuthDetails();
  }, [getAuthDetails]);

  return (
    <AuthContext.Provider value={authDetails}>{children}</AuthContext.Provider>
  );
};
