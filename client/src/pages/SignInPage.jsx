import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, TextField, Typography } from '@mui/material';
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

  const [screenSize, setScreenSize] = useState('');
  const handleResize = useCallback(() => {	
    if (window.innerWidth <= 280) {	
      setScreenSize('small');	
    } else if (window.innerWidth <= 500) {	
      setScreenSize('medium');	
    } else if (window.innerWidth<= 1000){	
      setScreenSize('large');	
    } else{
      setScreenSize('xlarge');
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  function responsiveText(){
    if (screenSize==='small') {
      return '90vw'
    }
    if (screenSize==='medium') {
      return '90vw'
    }
    if (screenSize==='large') {
      return '500px'
    }
    return '500px'
  }

  return (
    <Box>
    <Box className='left-half'>
      <Box className='circle-logo'>
        <img src={tree} alt='tree' />
      </Box>
    </Box>

    <Box className='right-half'>
      <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh'}}>
      <Box className='signin-box'>
        <Box className='logo-header'>
          <img src={logo} className='logo-img' alt='logo' />
          <h1>MindCap</h1>
        </Box>

        <h1 className='adjustwelcome' style={{ alignSelf: 'flex-start' }}>Welcome!</h1>
          <TextField
            sx={{
              '& > :not(style)': { my: 1, height: '60px', width: responsiveText},
            }}
            id="outlined-basic"
            label='Username'
            value={username}
            onChange={handleChangeUsername}
            name="username"
            variant="outlined"
            required
          />

          <TextField
            sx={{
              '& > :not(style)': { my: 1, height: '60px', width: responsiveText},
            }}
            id="outlined-basic"
            value={password}
            onChange={handleChangePassword}
            label='Password'
            name="password"
            variant="outlined"
            type="password"
            required
          />

          <LongButton sx={{mt:2, width:responsiveText}} variant="contained" onClick={handleSubmit}>
            SIGN IN
          </LongButton>

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
            <Link to='/signup'>
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
