import React from 'react';
import './profileIcon.css';
import { Typography } from '@mui/material';

function ProfileIcon({ accountName }) {
  return (
    <div className='profile-icon'>
      <span className='profile-icon-text'>
        <Typography variant="h3" sx={{ fontWeight: 'bold'}}>
            {accountName.charAt(0)}
        </Typography>
    </span>
    </div>
  );
}

export default ProfileIcon;