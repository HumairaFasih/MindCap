/* eslint-disable prettier/prettier */
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

// eslint-disable-next-line prefer-destructuring
const StudentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  first_name: {
    type: String,
    reqired: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  date_of_birth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Prefer not to say'],
  },
});

// search for username in Student collection, if found compare passwords
StudentSchema.statics.login = async function (username, password) {
  const student = await this.findOne({ username });
  if (student) {
    const result = await bcrypt.compare(password, student.password);
    if (result) {
      return student;
    }
    throw Error('Incorrect password');
  } else {
    throw Error('User does not exist');
  }
};

StudentSchema.statics.update = async function (filter, update) {
  try {
    await this.findOneAndUpdate(filter, update);
  } catch (err) {
    throw Error('Failed');
  }
};

StudentSchema.statics.getDetails = async function (filter) {
  
  console.log(filter);
  try {
    return await this.findOne(filter).lean();
  } catch (err) {
    throw Error('Failed');
  }
};

const Student = mongoose.model('Student', StudentSchema, 'Student');

module.exports = Student;
