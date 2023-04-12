import React, { useState } from 'react';
import axios from 'axios';

import { Box, Divider, Card, Grid } from '@mui/material';
import { LongButton } from '../components/LongButton';
import FormField from '../components/FormField';
import PageTitle from '../components/PageTitle';
import Sidebar from '../components/Sidebar';
import { instance } from '../axios';

const drawerWidth = 270;

function CreateCounselor() {
  const [values, setValues] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handling submit');
    instance
      .post(`/admin/create-counselor`, JSON.stringify(values))
      .then((result) => {
        console.log('yay');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Box sx={{ marginTop: '30px' }}>
            <PageTitle
              text="Create Counselor Account"
              marginB="15px"
              marginL="20px"
            />

            <Divider
              variant="middle"
              sx={{ background: '#000', mt: '15px', mb: '15px' }}
            />
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="80vh"
            >
              <Card
                variant="outlined"
                sx={{
                  marginTop: '30px',
                  width: '31.25rem',
                  minWidth: '',
                  boxShadow: '2px 2px 2px #00000055',
                  borderRadius: 10,
                  padding: '30px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FormField
                    id="username"
                    label="Username"
                    value={values.username}
                    onChange={handleChange('username')}
                    width="400px"
                  />
                  <Grid container spacing={2} width="415px">
                    <Grid item xs={6}>
                      <FormField
                        id="firstName"
                        label="First Name"
                        value={values.firstName}
                        onChange={handleChange('firstName')}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormField
                        id="lastName"
                        label="Last Name"
                        value={values.lastName}
                        onChange={handleChange('lastName')}
                      />
                    </Grid>
                  </Grid>
                  <FormField
                    id="email"
                    label="Email Address"
                    value={values.email}
                    onChange={handleChange('email')}
                    width="400px"
                  />
                  <FormField
                    id="outlined-adornment-password"
                    label="Password"
                    value={values.password}
                    onChange={handleChange('password')}
                    width="400px"
                    type={values.showPassword ? 'text' : 'password'}
                  />
                  <FormField
                    id="outlined-adornment-password"
                    label="Confirm Password"
                    value={values.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    width="400px"
                    type={values.showPassword ? 'text' : 'password'}
                  />

                  <LongButton
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{ mb: 2 }}
                  >
                    Create Account
                  </LongButton>
                </Box>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default CreateCounselor;
