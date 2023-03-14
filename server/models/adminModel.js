const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Admin = mongoose.model('Admin', {
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
    }
}, 'Admin');


module.exports = {
    Admin
}
    
    