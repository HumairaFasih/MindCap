import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { instance } from '../axios';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: null,
    authDetails: null,
  });

  const providerValue = useMemo(
    () => ({
      auth,
      setAuth,
    }),
    [auth, setAuth]
  );

  useEffect(() => {

    const authVal = localStorage.getItem('isAuthenticated');
    {
      authVal
        ? instance
            .get('/current-user')
            .then((result) => {
              setAuth({ isAuthenticated: true, authDetails: result.data });
            })
            .catch((error) => {
              setAuth((prevAuth) => ({
                ...prevAuth,
                isAuthenticated: false,
              }));
              console.log(error.message);
            })
        : console.log('User is not logged in');
    }
  }, []);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
