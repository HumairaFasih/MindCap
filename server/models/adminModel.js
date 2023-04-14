const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// eslint-disable-next-line prefer-destructuring
const AdminSchema = new mongoose.Schema({
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
});

// search for username in Student collection, if found compare passwords
AdminSchema.statics.login = async function (username, password) {
  const admin = await this.findOne({ username });
  if (admin) {
    const result = await bcrypt.compare(password, admin.password);
    if (result) {
      return admin;
    }
    throw Error('Incorrect password');
  } else {
    throw Error('User does not exist');
  }
};

AdminSchema.statics.update = async function (filter, update) {
  try {
    await this.findOneAndUpdate(filter, update);
  } catch (err) {
    throw Error('Failed');
  }
};

const Admin = mongoose.model('Admin', AdminSchema, 'Admin');

module.exports = Admin;
