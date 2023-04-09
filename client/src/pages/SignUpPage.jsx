// react component boiler plate
import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import logo from '../assets/images/logo-no-bg.png';
import tree from '../assets/images/tree.png';
import SignInFormField from '../components/SignInFormField';
import { LongButton } from '../components/LongButton';
import './SignInPage.css';
import { AuthContext } from '../context/AuthContext';

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
  
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    console.log(auth);
  }, [auth]);

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

  function responsiveTextSmallButton(){
    if (screenSize==='small') {
      return '44vw'
    }
    if (screenSize==='medium') {
      return '44vw'
    }
    if (screenSize==='large') {
      return '245px'
    }
    return '245px'
  }

  return (
    <Box>
      <Box className="left-half">
        <Box className="circle-logo">
          <img src={tree} alt="tree" />
        </Box>
      </Box>

      <Box className="right-half">
      <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh'}}>
        <Box className="signin-box">
          <Box className="logo-header">
            <img src={logo} className="logo-img" alt="logo" />
            <h1>MindCap</h1>
          </Box>

          <h1 className='adjustwelcome' style={{ alignSelf: 'flex-start' }}>Sign Up</h1>
          <Box
            className='adjustcredentials'
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
       
          >
            <SignInFormField
              key={7}
              width={responsiveTextSmallButton()}
              label="First Name"
              name="firstName"
              type="text"
              value={signUpFormData.firstName}
              onChangeHandler={handleChange}
            />
            <SignInFormField
              key={8}
              width={responsiveTextSmallButton()}
              label="Last Name"
              name="lastName"
              type="text"
              value={signUpFormData.lastName}
              onChangeHandler={handleChange}
            />
          </Box>
          <SignInFormField
            key={3}
            width={responsiveText()}
            label="Username/Roll Number"
            name="username"
            type="text"
            value={signUpFormData.userName}
            onChangeHandler={handleChange}
          />
          <SignInFormField
            key={4}
            width={responsiveText()}
            label="Email Address"
            name="emailAddress"
            type="email"
            value={signUpFormData.emailAddress}
            onChangeHandler={handleChange}
          />

          <SignInFormField
            key={5}
            width={responsiveText()}
            label="Password"
            type="password"
            name="password"
            value={signUpFormData.password}
            onChangeHandler={handleChange}
            error={error}
          />

          <SignInFormField
            key={6}
            width={responsiveText()}
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={signUpFormData.confirmPassword}
            onChangeHandler={handleChange}
            error={error}
          />

          <LongButton sx={{mt:2, width:responsiveText}} variant="contained" onClick={handleSubmit}>
            SIGN UP
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
              Already have a student account?
            </Typography>
            <Link to="../">
              <Typography sx={{ fontWeight: 'bold' }}>Sign In</Typography>
            </Link>
          </Box>
        </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SignUpPage;
