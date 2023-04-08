import React from 'react';
import { Box, Typography } from '@mui/material';
import IconImage from '../assets/images/logo-no-bg.png';
import './Preloader.css';

function LoadingScreen() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          verticalAlign: 'baseline',
        }}
      >
        <img
          src={IconImage}
          alt="loading icon"
          style={{ height: '70px', margin: '15px', marginLeft: '0px' }}
        />
        <Typography
          variant="h2"
          fontWeight="bold"
          color="#000000"
          sx={{ marginTop: '15px' }}
        >
          {' '}
          Mindcap
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          m: 1,
        }}
      >
        <Box className="dot dot-1" />
        <Box className="dot dot-2" />
        <Box className="dot dot-3" />
      </Box>
    </Box>
  );
}

export default LoadingScreen;
