const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const NotificationsSchema = new mongoose.Schema({
  notification_id: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  notification_type: {
    required: true,
    type: String,
  },
  notification_details: {
    type: String,
    required: true,
  },
});

const Notifications = mongoose.model(
  'Notifications',
  NotificationsSchema,
  'Notifications'
);

module.exports = Notifications;
