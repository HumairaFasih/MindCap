const mongoose = require('mongoose');

const MedicalRecordsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  filename: String,
  data: Buffer,
  contentType: String,
  visible_to: {
    type: String,
  },
});

MedicalRecordsSchema.statics.getDetails = async function (filter) {
  console.log('printing filter in medi model: ', filter);
  try {
    return await this.findOne(filter).lean();
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
