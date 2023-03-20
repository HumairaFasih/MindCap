const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const ReviewsSchema = mongoose.Schema({
  review_id: {
    type: Number,
    required: true,
  },
  counselor_username: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

const Reviews = mongoose.model('Reviews', ReviewsSchema, 'Reviews');

module.exports = Reviews;
