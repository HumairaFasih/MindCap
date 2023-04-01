const express = require('express');
const jwtDecode = require('jwt-decode');

const Appointments = require('../models/appointmentsModel');
const Notifications = require('../models/notificationsModel');

const router = express.Router();

router.post('/book', async (req, res) => {
  // get and decode jwt token
  const token = req.cookies.jwt;
  const jwtDecoded = jwtDecode(token);

  const { username, usertype } = jwtDecoded;

  if (usertype === 'Student') {
    try {
      // get data from request, add to appointment table, and generate notification as well for the counselor
      const { counselorUsername, meetingMode, date, time, share } = req.body;
      // insert share medical record with counselor logic here using the share variable
      await Appointments.create({
        student_id: username,
        counselor_id: counselorUsername,
        date,
        time,
        mode: meetingMode,
        status: 'Pending',
      });
      await Notifications.create({
        username: counselorUsername,
        date: new Date(),
        time: new Date(),
        notification_type: 'Appointment Request',
        notification_details: `You have a new appointment request! A student, ${username} wishes to book an appointment with you on ${date}, ${time}`,
      });
      res.send('Appointment made!');
    } catch (err) {
      res.send(err);
    }
  }
});

module.exports = router;
