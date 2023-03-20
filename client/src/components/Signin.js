// react component boiler plate
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import tree from './images/Tree.png';
import logo from './images/Logo.png';
import './signin.css';

const Signinbutton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  width: 400,
  lineHeight: 1.5,
  backgroundColor: '#93B77D',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#93B77D',
  },
  '&:active': {
    backgroundColor: '#93B77D',
  },
});

function Signin() {
  const [username, setUsername] = useState('');

  const [password, setpassword] = useState('');

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setpassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      /* axios presents some issues when it comes to setting cookies.
      If headers and credentials become an issue we should simply
      use fetch instead */
      const result = await axios({
        method: 'post',
        url: 'http://localhost:3003/api/authenticate/login',
        withCredentials: true,
        data: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      // Redirect to other screen when it is made
      if (result.data.id != null) {
        console.log('Login Successful, ...Redirect');
      } else {
        console.log('Login Failed!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="lefthalf">
        <div className="circlelogo">
          <img src={tree} alt="tree" />
        </div>
      </div>

      <div className="righthalf">
        <div className="signinbox">
          <div className="logoheader">
            <img src={logo} className="logoimg" alt="logo" />
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

          <Signinbutton variant="contained" onClick={handleSubmit}>
            SIGN IN
          </Signinbutton>
          <h5 className="bottomtext">
            Are you a student? <a href="./SignUp">Sign Up</a>{' '}
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Signin;
