import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Typography, Box, TextField } from '@mui/material';
import tree from '../assets/images/tree.png';
import logo from '../assets/images/logo-no-bg.png';
import { SignInButton } from '../components/SignInButton';
import SignInFormField from '../components/SignInFormField';
import './SignInPage.css';

function SignInPage() {
  const [signInFormData, setSignInFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setSignInFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, password } = signInFormData;
      const result = await axios({
        method: 'post',
        url: 'http://localhost:3003/api/authenticate/login',
        withCredentials: true,
        data: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      // Redirect to appropriate screen
      if (result.data.id != null) {
        console.log('Login Successful, Redirecting to Dashboard...');
        console.log(result.data);
        <Link to={`user/:${result.data.username}`} />;
      } else {
        console.log('Login Failed!');
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

          <h1 style={{ alignSelf: 'flex-start' }}>Welcome!</h1>
          <SignInFormField
            key={1}
            width="500px"
            label="Username"
            name="username"
            type="text"
            value={signInFormData.username}
            onChangeHandler={handleChange}
            autoFocus
          />
          <SignInFormField
            key={2}
            width="500px"
            label="Password"
            name="password"
            type="password"
            value={signInFormData.password}
            onChangeHandler={handleChange}
          />

          <SignInButton variant="contained" onClick={handleSubmit}>
            SIGN IN
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
              Don't have a student account?
            </Typography>
            <Link to="/signup">
              <Typography sx={{ fontWeight: 'bold' }}>Sign Up</Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SignInPage;
