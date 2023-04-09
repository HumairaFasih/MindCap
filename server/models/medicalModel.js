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
    type: [String],
  },
});

MedicalRecordsSchema.statics.getDetails = async function (filter) {
  try {
    return await this.findOne(filter).lean();
  } catch (err) {
    throw Error('Failed');
  }
};

MedicalRecordsSchema.statics.getDetailsNonLean = async function (filter) {
  try {
    return await this.findOne(filter);
  } catch (err) {
    throw Error('Failed');
  }
};

MedicalRecordsSchema.statics.addToVisibleTo = async function (
  username,
  counselor
) {
  try {
    console.log(username, counselor);
    return await this.findOneAndUpdate({ username }, { $push: {'visible_to': counselor }});
  } catch (err) {
    console.log(err)
    throw Error('Failed');
  }
};

const MedicalRecords = mongoose.model(
  'MedicalRecords',
  MedicalRecordsSchema,
  'MedicalRecords'
);

module.exports = MedicalRecords;
