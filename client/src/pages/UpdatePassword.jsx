import * as React from 'react';
// eslint-disable-next-line import/order
import Sidebar from '../components/Sidebar';
import {
  Box,
  Typography,
  Divider,
  Card,
  OutlinedInput,
  InputLabel,
  FormControl,
} from '@mui/material';
import './Student.css';
import axios from 'axios';
import { useState } from 'react';
import { SignInButton } from '../components/SignInButton';

const drawerWidth = 270;

function UpdatePassword() {
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const result = await axios({
      method: 'post',
      url: 'http://localhost:3003/api/profile/updatepassword',
      withCredentials: true,
      data: JSON.stringify({ newpassword: password }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(result);
  };

  return (
    <div>
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
          <div className="MainScreen">
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', mb: '15px', ml: '20px' }}
            >
              Update Password
            </Typography>
            <Typography variant="h6" sx={{ ml: '20px' }}>
              Just type the password twice and try not to forget it.
            </Typography>

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
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '450px',
                  boxShadow: '2px 2px 2px #00000055',
                  borderRadius: 10,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: 20,
                      mr: 5,
                      ml: 5,
                      mt: 2,
                      textAlign: 'center',
                      mb: 3,
                    }}
                  >
                    Password should be and must contain:
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="row"
                >
                  <Typography
                    sx={{
                      width: 100,
                      fontSize: 20,
                      mr: 2,
                      ml: 2,
                      textAlign: 'center',
                      fontWeight: 'Bold',
                    }}
                  >
                    8+ Character
                  </Typography>

                  <Typography
                    sx={{
                      width: 100,
                      fontSize: 20,
                      mr: 2,
                      ml: 2,
                      textAlign: 'center',
                      fontWeight: 'Bold',
                    }}
                  >
                    AA Uppercase
                  </Typography>

                  <Typography
                    sx={{
                      width: 100,
                      fontSize: 20,
                      mr: 2,
                      ml: 2,
                      textAlign: 'center',
                      fontWeight: 'Bold',
                    }}
                  >
                    aa Lowercase
                  </Typography>

                  <Typography
                    sx={{
                      width: 100,
                      fontSize: 20,
                      mr: 2,
                      ml: 2,
                      textAlign: 'center',
                      fontWeight: 'Bold',
                    }}
                  >
                    123 Number
                  </Typography>
                </Box>

                <Divider
                  variant="middle"
                  sx={{
                    background: '#000000',
                    mt: '20px',
                    mb: '20px',
                    width: '450px',
                    alignItems: 'center',
                  }}
                />
                <Box
                  sx={{
                    alignItems: 'center',
                    alignContent: 'center',
                    mr: 10,
                    ml: 10,
                  }}
                >
                  <Box>
                    <FormControl
                      sx={{ mt: 2, mb: 2, width: '400px' }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        New Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlinedpassword"
                        type={showPassword ? 'text' : 'password'}
                        label="New Password"
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl
                      sx={{ mb: 2, width: '400px' }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Confirm Password
                      </InputLabel>
                      <OutlinedInput
                        onChange={handlePassChange}
                        id="outlinedpassword"
                        type={showPassword ? 'text' : 'password'}
                        label="Confirm Password"
                      />
                    </FormControl>
                  </Box>

                  <SignInButton
                    onClick={handleUpdate}
                    variant="contained"
                    sx={{ mb: 1 }}
                  >
                    Update Password
                  </SignInButton>
                </Box>
              </Card>
            </Box>
          </div>
        </Box>
      </Box>
    </div>
  );
}
export default UpdatePassword;
