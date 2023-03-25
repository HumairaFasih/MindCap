import React from 'react';
import { Rating } from '@mui/material';

function MyRating({ name, value, readOnly, onChange }) {
  const handleChange = (event, newValue) => {
    if (!readOnly && onChange) {
      onChange(event, newValue);
    }
  };

  return (
    <Rating
      name={name}
      value={value}
      readOnly={readOnly}
      onChange={handleChange}
    />
  );
}

export default MyRating;