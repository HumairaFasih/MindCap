// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    username: {
      type: String,
      reqired: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
