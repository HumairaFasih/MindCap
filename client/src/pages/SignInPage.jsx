import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { TextField, Typography } from '@mui/material';
import tree from '../assets/images/tree.png';
import logo from '../assets/images/logo-no-bg.png';
import { LongButton } from '../components/LongButton';
import './SignInPage.css';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const navigate = useNavigate();
  // const location = useLocation();
  // const dashboardRoute = `${location.pathname
  //   .split('/')
  //   .slice(0, -1)
  //   .join('/')}/dashboard`;

  // const handleNavigation = () => {
  //   navigate(dashboardRoute);
  // };

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
        // handleNavigation();
      } else {
        console.log('Login Failed!');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <div className="left-half">
        <div className="circle-logo">
          <img src={tree} alt="tree" />
        </div>
      </div>

      <div className="right-half">
        <div className="signin-box">
          <div className="logo-header">
            <img src={logo} className="logo-img" alt="logo" />
            <h1>MindCap</h1>
          </div>

          <h1>Welcome!</h1>
          <TextField
            sx={{
              '& > :not(style)': { my: 1, width: '400px', height: '50px' },
            }}
            id="outlined-basic"
            value={username}
            onChange={handleChangeUsername}
            name="username"
            variant="outlined"
            required
          />

          <TextField
            sx={{
              '& > :not(style)': { my: 2, width: '400px', height: '50px' },
            }}
            id="outlined-basic"
            value={password}
            onChange={handleChangePassword}
            name="password"
            variant="outlined"
            type="password"
            required
          />

          <LongButton variant="contained" onClick={handleSubmit}>
            SIGN IN
          </LongButton>
          <Typography
            className="bottom-text"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 3,
            }}
          >
            Are you a student?
            <Link to="/signup">Sign Up</Link>
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
