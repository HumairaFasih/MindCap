const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const AppointmentsSchema = new mongoose.Schema({
  appointment_id: {
    type: Number,
    required: true,
  },
  student_id: {
    type: Number,
    required: true,
  },
  counselor_id: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Cancelled'],
    required: true,
  },
});

const Appointments = mongoose.model(
  'Appointments',
  AppointmentsSchema,
  'Appointments'
);

module.exports = Appointments;
