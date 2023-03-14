const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Availability = mongoose.model('Availability', {
    counselor_username: {
        type: String,    
        required: true,
    },
    day_type: {
      type: String,
      required: true,
      enum: ['Weekdays', 'Weekends'],
    },
    time: {
        type: String,
        required: true, 
        enum: ['12-3AM','3-6AM','6-9AM','9-12AM','12-3PM','3-6PM','6-9PM','9-12PM']
    }
}, 'Availability');


module.exports = {
    Availability
}
    
    