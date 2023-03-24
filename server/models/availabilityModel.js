const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const AvailabilitySchema = new mongoose.Schema({
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
    enum: [
      '12-3AM',
      '3-6AM',
      '6-9AM',
      '9-12AM',
      '12-3PM',
      '3-6PM',
      '6-9PM',
      '9-12PM',
    ],
  },
});

AvailabilitySchema.statics.getdetails = async function(filter) {
  try {
    return await this.findOne(filter).lean();
  }
  catch(err) {
    throw Error('Failed')
  }
}

AvailabilitySchema.statics.update = async function(filter, update) {
  try{
    await this.findOneAndUpdate(filter, update, {upsert: true});
  }
  catch(err){
    throw Error('Failed')
  }
}

const Availability = mongoose.model(
  'Availability',
  AvailabilitySchema,
  'Availability'
);

module.exports = Availability;
