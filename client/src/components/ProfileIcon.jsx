import React from 'react';
import './profileIcon.css';
import { Box, Typography } from '@mui/material';

function ProfileIcon({ accountName }) {
  return (
    <Box className="profile-icon">
      <span className="profile-icon-text">
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          {accountName.charAt(0)}
        </Typography>
      </span>
    </Box>
  );
}

export default ProfileIcon;
