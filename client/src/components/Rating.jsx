import * as React from 'react';
import { useState } from 'react';
import Rating from '@mui/material/Rating';

export default function MyRating({ rating }) {
    const [value, setValue] = useState(rating);
  
    const handleRatingChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Rating
        name="simple-controlled"
        value={value}
        onChange={handleRatingChange}
      />
    );
  }