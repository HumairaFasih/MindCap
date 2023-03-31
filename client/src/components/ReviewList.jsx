import React from 'react';
import { Box, Divider } from '@mui/material';
import Review from './Review';

const ReviewList = ({ reviews }) => (
  <Box>
    {reviews.map((review, index) => (
      <Box key={index}>
        <Review content={review.review} rating={review.rating} />
        {index !== reviews.length - 1 && (
          <Divider sx={{ marginTop: '10px', marginBottom: '10px' }} />
        )}
      </Box>
    ))}
  </Box>
);

export default ReviewList;
