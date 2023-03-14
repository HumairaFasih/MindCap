// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');


// eslint-disable-next-line prefer-destructuring
const Counselor = mongoose.model('Counselor', {
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
      required: true
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Prefer not to say'],
      required: true
    },
    bio: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    }
}, 'Counselor');


module.exports = {
    Counselor
}

