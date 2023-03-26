import { React, useState } from 'react';
import { Rating } from '@mui/material';


function MyRating({ name, value, readOnly, onChange }) {
  const [rating, setRating] = useState(value);
  const handleChange = (event, newValue) => {
    // if (readOnly) return;
    setRating(newValue);
    onChange(newValue);
    
  };

  return (
    <Rating
      name={name}
      value={readOnly ? value : rating}
      readOnly={readOnly}
      onChange={handleChange}
    />
  );
}

export default MyRating;