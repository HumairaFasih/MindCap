const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const MedicalRecordsSchema = new mongoose.Schema({
  student_username: {
    type: String,
    required: true,
  },
  attachment: {
    required: true,
    contentType: { type: String, default: 'application/octet-stream' },
    data: Buffer,
  },
  visible_to: {
    type: String,
    required: true,
  },
});

const MedicalRecords = mongoose.model(
  'MedicalRecords',
  MedicalRecordsSchema,
  'MedicalRecords'
);

module.exports = MedicalRecords;
