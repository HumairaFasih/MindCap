import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Typography } from '@mui/material';
import { instance } from '../axios';
import tree from '../assets/images/tree.png';
import logo from '../assets/images/logo-no-bg.png';
import { LongButton } from '../components/LongButton';
import './SignInPage.css';
import { AuthContext } from '../context/AuthContext';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    instance
      .post('authenticate/login', JSON.stringify({ username, password }))
      .then(() => {
        instance
          .get('/current-user')
          .then((result) => {
            // console.log(result);
            setAuth({
              authDetails: result.data,
              isAuthenticated: true,
            });
            navigate('/', { replace: true });
          })
          .catch((err) => {
            console.log('Error in getting user details using jwt cookie');
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log('Error logging user in');
        console.log(err.message);
      });
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
