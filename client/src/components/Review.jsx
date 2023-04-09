import React from 'react';
import { Typography } from '@mui/material';
import MyRating from './Rating';
import '../pages/profile.css'
const Review = ({ content, rating }) => {
  return (
    <div>
      <MyRating name="rating" value={rating} readOnly />
      <div className="review-content">
      <Typography variant="body1" sx={{ fontFamily: 'Roboto, sans-serif' }}>
        {content}
      </Typography>
      </div>
    </div>
  );
};

export default Review;