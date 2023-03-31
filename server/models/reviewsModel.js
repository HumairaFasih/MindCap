const mongoose = require('mongoose');

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

ReviewsSchema.statics.getDetails = async function (filter) {
  try {
    return await this.find(filter).lean();
  } catch (err) {
    throw Error('Failed');
  }
};

const Reviews = mongoose.model('Reviews', ReviewsSchema, 'Reviews');

module.exports = Reviews;
