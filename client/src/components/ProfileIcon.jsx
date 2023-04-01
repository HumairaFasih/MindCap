import React from 'react';
import './profileIcon.css';
import { Box, Typography } from '@mui/material';

function ProfileIcon({ accountName }) {
  return (
    <Box className="profile-icon">
      <span className="profile-icon-text">
        <div>
        <Typography variant="h3" sx={{ fontWeight: 'bold'}}>
          {accountName.charAt(0)}
        </Typography>

        </div>
        
      </span>
    </Box>
  );
}

export default ProfileIcon;
