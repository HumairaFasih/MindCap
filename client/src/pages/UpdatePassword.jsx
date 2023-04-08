import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Divider,
  IconButton,
  InputAdornment,
  Card,
  InputLabel,
  FormControl,
  TextField,
  OutlinedInput,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Sidebar from '../components/Sidebar';
import { LongButton } from '../components/LongButton';
import { instance } from '../axios';

const drawerWidth = 270;

function UpdatePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleShowPassword = () => setShowPassword((show) => !show);
  const handleConfirmShowPassword = () => {
    setShowConfirmPassword((show) => !show);
  };

  // useEffect(() => {
  //   if (error) {
  //     setError(false);
  //     setErrorText('');
  //   }
  // }, [error]);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const passwordReqStyle = {
    width: 100,
    fontSize: 20,
    ml: 2,
    mr: 2,
    textAlign: 'center',
    fontWeight: 'bold',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    instance
      .patch(
        '/authenticate/update-password',
        JSON.stringify({ newPassword: password })
      )
      .then((result) => {
        console.log(result);
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
          component="form"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
          onSubmit={handleSubmit}
        >
          <Box sx={{ marginTop: '30px' }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', mb: '15px', ml: '20px' }}
            >
              Update Password
            </Typography>
            <Typography variant="h6" sx={{ ml: '20px' }}>
              Just type the password twice and try not to forget it!
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
                  <Typography sx={passwordReqStyle}>8+ Character</Typography>

                  <Typography sx={passwordReqStyle}>AA Uppercase</Typography>

                  <Typography sx={passwordReqStyle}>aa Lowercase</Typography>

                  <Typography sx={passwordReqStyle}>123 Number</Typography>
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
                      <InputLabel htmlFor="new-password">
                        New Password
                      </InputLabel>
                      <OutlinedInput
                        id="new-password"
                        variant="outlined"
                        error={error}
                        type={showPassword ? 'text' : 'password'}
                        label="New Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl
                      sx={{ mb: 2, width: '400px' }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="confirm-password">
                        Confirm Password
                      </InputLabel>
                      <OutlinedInput
                        id="confirm-password"
                        variant="outlined"
                        error={error}
                        // helperText={errorText}
                        type={showConfirmPassword ? 'text' : 'password'}
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle confirm password visibility"
                              onClick={handleConfirmShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Box>

                  <LongButton
                    type="submit"
                    variant="contained"
                    sx={{ mb: 1 }}
                    // onClick={(e) => {
                    //   if (password !== confirmPassword) {
                    //     e.preventDefault();
                    //     setError(true);
                    //     // setErrorText('Passwords do not match');
                    //   }
                    // }}
                  >
                    Update Password
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
export default UpdatePassword;
