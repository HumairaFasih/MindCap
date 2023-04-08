import { createContext, useCallback, useMemo, useState } from 'react';
// import axios from 'axios';
import { instance } from '../axios';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    authDetails: null,
  });

  const providerValue = useMemo(
    () => ({
      auth,
      setAuth,
    }),
    [auth, setAuth]
  );

  const getAuthDetails = useCallback(async () => {
    instance
      .get('/current-user')
      .then((result) => {
        setAuth({ isAuthenticated: true, authDetails: result.data });
        console.log('Hello logging result: ', result.data);
      })
      .catch((error) => {
        setAuth((authDetails) => ({ ...authDetails, isAuthenticated: false }));
      });
  }, []);

  useMemo(() => {
    getAuthDetails();
  }, [getAuthDetails]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
