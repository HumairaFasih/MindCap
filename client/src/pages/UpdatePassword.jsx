import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Alert,
  Typography,
  Divider,
  IconButton,
  InputAdornment,
  Card,
  InputLabel,
  FormControl,
  OutlinedInput,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Sidebar from '../components/Sidebar';
import { instance } from '../axios';
import { MyButton } from '../components/MyButton';

const drawerWidth = 270;

function UpdatePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mismatch, setMismatch] = useState(false);

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

    if (password === confirmPassword) {
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
    } else {
      setMismatch(true);
    }
  };

  const [screenSize, setScreenSize] = useState('');
  const handleResize = useCallback(() => {
    if (window.innerWidth <= 280) {
      setScreenSize('small');
    } else if (window.innerWidth <= 500) {
      setScreenSize('medium');
    } else if (window.innerWidth <= 1000) {
      setScreenSize('large');
    } else {
      setScreenSize('xlarge');
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  function responsiveText() {
    if (screenSize === 'small') {
      return '90vw';
    }
    if (screenSize === 'medium') {
      return '90vw';
    }
    if (screenSize === 'large') {
      return '500px';
    }
    return '500px';
  }

  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
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
                  component="form"
                  onSubmit={handleSubmit}
                >
                  {mismatch && (
                    <Alert
                      severity="error"
                      sx={{ width: responsiveText(), mb: 2 }}
                    >
                      Passwords do not match. Please try again.
                    </Alert>
                  )}
                  <Box>
                    <FormControl
                      sx={{ mt: 2, mb: 2, width: responsiveText() }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="new-password">
                        New Password
                      </InputLabel>
                      <OutlinedInput
                        id="new-password"
                        variant="outlined"
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
                              onClick={() => setShowPassword((show) => !show)}
                              onMouseDown={(e) => e.preventDefault()}
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
                      sx={{ mb: 2, width: responsiveText() }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="confirm-password">
                        Confirm Password
                      </InputLabel>
                      <OutlinedInput
                        id="confirm-password"
                        variant="outlined"
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
                              onClick={() =>
                                setShowConfirmPassword(
                                  (confirmShow) => !confirmShow
                                )
                              }
                              onMouseDown={(e) => e.preventDefault()}
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

                  <MyButton
                    type="submit"
                    variant="contained"
                    width={responsiveText()}
                    fullWidth
                    bradius="3"
                    sx={{ mb: 1 }}
                  >
                    Update Password
                  </MyButton>
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
