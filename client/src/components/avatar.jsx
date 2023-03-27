import * as React from 'react';
import Avatar from '@mui/material/Avatar';

function LetterAvatars(props) {
  const avatarStyle = {
    bgcolor: '#4C4646',
    color: 'white',
    fontSize: '40px',
    height: '80px',
    width: '80px',
  }
  return (
      <Avatar sx = {avatarStyle}>S</Avatar>
  );
}

export default LetterAvatars