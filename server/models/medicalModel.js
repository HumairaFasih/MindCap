const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const MedicalRecordsSchema = new mongoose.Schema({
  student_username: {
    type: String,
    required: true,
  },
  data: Buffer,
  contentType: String,
  visible_to: {
    type: String,
  },
});

MedicalRecordsSchema.statics.getDetails = async function (filter) {
  try {
    return await this.findOne(filter);
  } catch (err) {
    throw Error('Failed');
  }
};

const MedicalRecords = mongoose.model(
  'MedicalRecords',
  MedicalRecordsSchema,
  'MedicalRecords'
);

module.exports = MedicalRecords;
