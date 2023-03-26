const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
// eslint-disable-next-line prefer-destructuring
const ReviewsSchema = mongoose.Schema({
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

ReviewsSchema.statics.getdetails = async function (filter) {
  try {
    return await this.find(filter).lean();
  } catch (err) {
    throw Error('Failed');
  }
};

const Reviews = mongoose.model('Reviews', ReviewsSchema, 'Reviews');

module.exports = Reviews;
