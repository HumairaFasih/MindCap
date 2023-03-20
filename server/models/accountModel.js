// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const AccountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  account_type: {
    type: String,
    required: true,
  },
});

const Account = mongoose.model('Account', AccountSchema, 'Account');

module.exports = Account;
