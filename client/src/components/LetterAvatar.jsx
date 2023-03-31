import React from 'react';
import Avatar from '@mui/material/Avatar';

function LetterAvatar({ fontSize, height, width, username }) {
  return (
    <Avatar
      sx={{
        bgcolor: '#6b6766',
        color: 'white',
        fontSize: { fontSize },
        height: { height },
        width: { width },
      }}
    >
      {username.charAt(0).toUpperCase()}
    </Avatar>
  );
}

export default LetterAvatar;
