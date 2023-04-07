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

const Complaints = mongoose.model('Complaints', ComplaintsSchema, 'Complaints');

module.exports = Complaints;
