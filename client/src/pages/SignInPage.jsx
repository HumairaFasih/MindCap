import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Alert,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { instance } from '../axios';
import tree from '../assets/images/tree.png';
import logo from '../assets/images/logo-no-bg.png';
import { MyButton } from '../components/MyButton';
import AuthFormField from '../components/AuthFormField';
import './SignInPage.css';
import { AuthContext } from '../context/AuthContext';

function SignIn() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [showPassword, setShowPassword] = useState(false);
  const [signInFormData, setSignInFormData] = useState({
    username: {
      value: '',
      error: false,
    },
    password: {
      value: '',
      error: false,
    },
  });

  const [authError, setAuthError] = useState(false);

  const handleChange = (name, value) => {
    setSignInFormData((formValues) => ({
      ...formValues,
      [name]: { value, error: value ? false : true },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tempFormValues = { ...signInFormData };

    Object.entries(signInFormData).forEach(([field, fieldObj]) => {
      if (fieldObj?.value === '') {
        e.preventDefault();
        tempFormValues = {
          ...tempFormValues,
          [field]: {
            ...tempFormValues[field],
            error: true,
          },
        };
      }
    });

    setSignInFormData(tempFormValues);

    const { username, password } = signInFormData;

    instance
      .post(
        'authenticate/login',
        JSON.stringify({
          username: username.value,
          password: password.value,
        })
      )
      .then(() => {
        instance
          .get('/current-user')
          .then((result) => {
            console.log(result.data);
            localStorage.setItem('isAuthenticated', 'true');
            setAuth({ isAuthenticated: true, authDetails: result.data });
            navigate(from, { replace: true });
          })
          .catch((err) => {
            setAuth((prev) => ({
              ...prev,
              isAuthenticated: false,
            }));
            console.log('Error in getting user details using jwt cookie');
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log('Error logging user in');
        console.log(err.message);
        setAuthError(true);
      });
  };

  const [screenSize, setScreenSize] = useState('');
  const handleResize = useCallback(() => {
    if (window.innerWidth <= 280) {
      setScreenSize('small');
    } else if (window.innerWidth <= 500) {
      setScreenSize('medium');
    } else if (window.innerWidth <= 1000) {
      setScreenSize('large');
    } else {
      setScreenSize('xlarge');
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {

  });

  function responsiveText() {
    if (screenSize === 'small') {
      return '90vw';
    }
    if (screenSize === 'medium') {
      return '90vw';
    }
    if (screenSize === 'large') {
      return '500px';
    }
    return '500px';
  }

  return (
    <Box>
      <Box className="left-half">
        <Box className="circle-logo">
          <img src={tree} alt="tree" />
        </Box>
      </Box>

      <Box className="right-half">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Box className="signin-box">
            <Box className="logo-header">
              <img src={logo} className="logo-img" alt="logo" />
              <h1>MindCap</h1>
            </Box>

            <h1 className="adjustwelcome" style={{ alignSelf: 'flex-start' }}>
              Welcome!
            </h1>
            {authError && (
              <Alert severity="error" sx={{ width: responsiveText(), mb: 2 }}>
                Incorrect username or password. Please try again.
              </Alert>
            )}
            <AuthFormField
              key={1}
              width={responsiveText()}
              label="Username"
              name="username"
              type="text"
              value={signInFormData.username.value}
              onChangeHandler={handleChange}
              error={signInFormData.username.error}
              autoFocus
            />
            <AuthFormField
              key={2}
              width={responsiveText()}
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={signInFormData.password.value}
              onChangeHandler={handleChange}
              error={signInFormData.password.error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <MyButton
              sx={{ mt: 2 }}
              width={responsiveText()}
              fullWidth
              variant="contained"
              bradius="3"
              type="submit"
            >
              SIGN IN
            </MyButton>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 3,
              }}
            >
              <Typography align="center" sx={{ padding: 1 }}>
                Don't have a student account?
              </Typography>
              <Link to="/signup">
                <Typography sx={{ fontWeight: 'bold' }}>Sign Up</Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SignIn;
