// react component boiler plate
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import logo from '../assets/images/logo-no-bg.png';
import tree from '../assets/images/tree.png';
import { SignInButton } from '../components/SignInButton';
import SignInFormField from '../components/SignInFormField';
import './SignInPage.css';

function SignUpPage() {
  const [signUpFormData, setSignUpFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    userName: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(false);

  const handleChange = (name, value) => {
    setSignUpFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleErrorState = (state) => {
    setError(state);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      emailAddress,
      username,
      password,
      confirmPassword,
    } = signUpFormData;

    if (password !== confirmPassword) {
      toggleErrorState(true);
    } else {
      toggleErrorState(false);
    }

    try {
      const result = await axios({
        method: 'post',
        url: 'http://localhost:3003/api/authenticate/signup',
        withCredentials: true,
        data: JSON.stringify({
          firstName,
          lastName,
          emailAddress,
          username,
          password,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      // Redirect to appropriate screen
      if (result.data.id != null) {
        console.log('Sign Up Successful, Redirecting to Dashboard...');
        console.log(result.data);
        <Link to={`user/:${result.data.username}`} />;
      } else {
        console.log('Sign Up Failed!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Box className="left-half">
        <Box className="circle-logo">
          <img src={tree} alt="tree" />
        </Box>
      </Box>

      <Box className="right-half">
        <Box className="signin-box">
          <Box className="logo-header">
            <img src={logo} className="logo-img" alt="logo" />
            <h1>MindCap</h1>
          </Box>

          <h1 style={{ alignSelf: 'flex-start' }}>Sign Up</h1>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'space-between',
              justifyContent: 'space-between',
            }}
          >
            <SignInFormField
              key={7}
              width="200px"
              label="First Name"
              name="firstName"
              type="text"
              value={signUpFormData.firstName}
              onChangeHandler={handleChange}
            />
            <SignInFormField
              key={8}
              width="200px"
              label="Last Name"
              name="lastName"
              type="text"
              value={signUpFormData.lastName}
              onChangeHandler={handleChange}
            />
          </Box>
          <SignInFormField
            key={3}
            width="500px"
            label="Username/Roll Number"
            name="username"
            type="text"
            value={signUpFormData.userName}
            onChangeHandler={handleChange}
          />
          <SignInFormField
            key={4}
            width="500px"
            label="Email Address"
            name="emailAddress"
            type="email"
            value={signUpFormData.emailAddress}
            onChangeHandler={handleChange}
          />

          <SignInFormField
            key={5}
            width="500px"
            label="Password"
            type="password"
            name="password"
            value={signUpFormData.password}
            onChangeHandler={handleChange}
            error={error}
          />

          <SignInFormField
            key={6}
            width="500px"
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={signUpFormData.confirmPassword}
            onChangeHandler={handleChange}
            error={error}
          />

          <SignInButton variant="contained" onClick={handleSubmit}>
            SIGN UP
          </SignInButton>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 3,
            }}
          >
            <Typography sx={{ padding: 1 }}>
              Already have a student account?
            </Typography>
            <Link to="../">
              <Typography sx={{ fontWeight: 'bold' }}>Sign In</Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SignUpPage;
