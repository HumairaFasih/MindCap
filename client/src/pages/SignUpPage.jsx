import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import logo from '../assets/images/logo-no-bg.png';
import tree from '../assets/images/tree.png';
import AuthFormField from '../components/AuthFormField';
import { MyButton } from '../components/MyButton';
import './SignInPage.css';
import { instance } from '../axios';

function SignUp() {
  const [signUpFormData, setSignUpFormData] = useState({
    firstName: {
      value: '',
      error: false,
    },
    lastName: {
      value: '',
      error: false,
    },
    email: {
      value: '',
      error: false,
    },
    username: {
      value: '',
      error: false,
    },
    password: {
      value: '',
      error: false,
    },
    confirmPassword: {
      value: '',
      error: false,
    },
  });

  const handleChange = (name, value) => {
    if (name !== 'password' && name !== 'confirmPassword') {
      setSignUpFormData((formValues) => ({
        ...formValues,
        [name]: { value, error: value ? false : true },
      }));
    } else {
      if (name === 'password') {
        if (value !== signUpFormData.confirmPassword.value) {
          setSignUpFormData((prev) => ({
            ...prev,
            [name]: { value, error: true },
            confirmPassword: { ...prev['confirmPassword'], error: true },
          }));
        } else if (value === signUpFormData.confirmPassword.value) {
          setSignUpFormData((prev) => ({
            ...prev,
            [name]: { value, error: false },
            confirmPassword: { ...prev['confirmPassword'], error: false },
          }));
        }
      } else if (name === 'confirmPassword') {
        if (value !== signUpFormData.password.value) {
          setSignUpFormData((prev) => ({
            ...prev,
            [name]: { value, error: true },
            password: { ...prev['password'], error: true },
          }));
        } else if (value === signUpFormData.password.value) {
          setSignUpFormData((prev) => ({
            ...prev,
            [name]: { value, error: false },
            password: { ...prev['password'], error: false },
          }));
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let tempFormValues = { ...signUpFormData };

    Object.entries(signUpFormData).forEach(([field, fieldObj]) => {
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

    // console.log(tempFormValues);

    setSignUpFormData(tempFormValues);

    const { firstName, lastName, email, username, password, confirmPassword } =
      signUpFormData;

    if (password.value !== confirmPassword.value) {
      e.preventDefault();
      setSignUpFormData((prev) => ({
        ...prev,
        password: { ...prev[password], error: true },
        confirmPassword: { ...prev[confirmPassword], error: true },
      }));
    }

    // THE PASSWORD MUST CONTAIN AT LEAST 8 CHARACTERS, 1 UPPERCASE, 1 LOWERCASE, 1 NUMBER
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (passwordRegex.test(password.value)) { // if password is valid
      {
        instance
          .post(
            '/authenticate/signup',
            JSON.stringify({
              firstName: firstName.value,
              lastName: lastName.value,
              email: email.value,
              username: username.value,
              password: password.value,
            })
          )
          .then((result) => {
            console.log('Sign Up Successful, Redirecting to Dashboard...');
            console.log(result);
            navigate('../login');
          })
          .catch((err) => {
            console.log('Sign Up Failed!');
            console.log(err.message);
          });
      }
    }
    else {
      e.preventDefault();
      setSignUpFormData((prev) => ({
        ...prev,
        password: { ...prev[password], error: true },
        confirmPassword: { ...prev[confirmPassword], error: true },
      }));
    }
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

  function responsiveTextSmall() {
    if (screenSize === 'small') {
      return '44vw';
    }
    if (screenSize === 'medium') {
      return '44vw';
    }
    if (screenSize === 'large') {
      return '245px';
    }
    return '245px';
  }

  const navigate = useNavigate();

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
              Sign Up
            </h1>
            <Box
              className="adjustcredentials"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'space-between',
                justifyContent: 'space-between',
              }}
            >
              <AuthFormField
                key={1}
                autoFocus
                width={responsiveTextSmall()}
                label="First Name"
                name="firstName"
                type="text"
                value={signUpFormData.firstName.value}
                onChangeHandler={handleChange}
                error={signUpFormData.firstName.error}
              />
              <AuthFormField
                key={2}
                width={responsiveTextSmall()}
                label="Last Name"
                name="lastName"
                type="text"
                value={signUpFormData.lastName.value}
                onChangeHandler={handleChange}
                error={signUpFormData.lastName.error}
              />
            </Box>
            <AuthFormField
              key={3}
              width={responsiveText()}
              label="Username/Roll Number"
              name="username"
              type="text"
              value={signUpFormData.username.value}
              onChangeHandler={handleChange}
              error={signUpFormData.username.error}
            />
            <AuthFormField
              key={4}
              width={responsiveText()}
              label="Email Address"
              name="email"
              type="email"
              value={signUpFormData.email.value}
              onChangeHandler={handleChange}
              error={signUpFormData.email.error}
            />

            <AuthFormField
              key={5}
              width={responsiveText()}
              label="Password"
              type="password"
              name="password"
              value={signUpFormData.password.value}
              onChangeHandler={handleChange}
              error={signUpFormData.password.error}
              helperText={
                signUpFormData.password.value && 'Password must contain at least 8 characters, 1 uppercase, 1 lowercase, and 1 number'
              }
            />

            <AuthFormField
              key={6}
              width={responsiveText()}
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={signUpFormData.confirmPassword.value}
              onChangeHandler={handleChange}
              error={signUpFormData.confirmPassword.error}
              helperText={
                signUpFormData.confirmPassword.value &&
                'Passwords need to match!'
              }
            />

            <MyButton
              width={responsiveText()}
              fullWidth
              variant="contained"
              bradius="3"
              sx={{ mt: 2 }}
              type="submit"
            >
              SIGN UP
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
                Already have a student account?
              </Typography>
              <Link to="../login">
                <Typography sx={{ fontWeight: 'bold' }}>Sign In</Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SignUp;
