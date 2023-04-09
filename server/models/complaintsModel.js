const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const ComplaintsSchema = new mongoose.Schema({
  counselor_username: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  filed_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Resolved'],
    required: true,
  },
});

ComplaintsSchema.statics.update = async function (filter, update) {
  try {
    await this.findOneAndUpdate(filter, update);
  } catch (err) {
    throw Error('Failed');
  }
};

const Complaints = mongoose.model('Complaints', ComplaintsSchema, 'Complaints');

module.exports = Complaints;
