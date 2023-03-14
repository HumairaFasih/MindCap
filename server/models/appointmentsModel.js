const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Complaints = mongoose.model('Complaints', {
    complaint_id: {
        type: Number,    
        required: true
    },
    counselor_username: {
        type: String,    
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    details: {
      type: String,
      required: true
    },
    filed_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Resolved'],
        required: true
    }    
}, 'Appointments');


module.exports = {
    Complaints
}
    
    