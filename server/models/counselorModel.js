// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

// eslint-disable-next-line prefer-destructuring
const CounselorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Prefer not to say'],
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
});

// search for username in Counselor collection, if found compare passwords
CounselorSchema.statics.login = async function (email, password) {
  const counselor = await this.findOne({ email });
  if (counselor) {
    const result = await bcrypt.compare(password, counselor.password);
    if (result) {
      return counselor;
    }
    throw Error('Incorrect password');
  } else {
    throw Error('User does not exist');
  }
};

CounselorSchema.statics.updateOne = async function(filter, update) {
  try{
  await this.findOneAndUpdate(filter, update);
  }
  catch(err){
    throw Error('Failed')
  }
}

CounselorSchema.statics.getdetails = async function(filter) {
  try {
    return await this.findOne(filter).lean();
  }
  catch(err) {
    throw Error('Failed')
  }
}

const Counselor = mongoose.model('Counselor', CounselorSchema, 'Counselor');

module.exports = Counselor;
