import React from 'react';
import { Divider } from '@mui/material';
import Review from './Review';
// disbale eslint arrow body style
/* eslint-disable arrow-body-style */
const ReviewList = ({ reviews }) => {
  return (
    <div>
      {reviews.map((review, index) => (
        <div key={index}>
          <Review content={review.review} rating={review.rating} />
          {index !== reviews.length - 1 && <Divider sx = {{marginTop: '10px', marginBottom: '10px'}}/>}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;