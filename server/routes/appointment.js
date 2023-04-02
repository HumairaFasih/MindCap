const express = require('express');
const jwtDecode = require('jwt-decode');
const Appointments = require('../models/appointmentsModel');
const Notifications = require('../models/notificationsModel');

const router = express.Router();

router.post('/set-status', async (req, res) => {
  // get and decode jwt token
  const token = req.cookies.jwt;
  const jwtDecoded = jwtDecode(token);

  const { username } = jwtDecoded;

  const { appointmentId, studentUsername, userChoice } = req.body;
  try {
    await Appointments.update({ _id: appointmentId }, { status: userChoice });
    // generate notification for student
    await Notifications.create({
      username: studentUsername,
      date: new Date(),
      time: new Date(),
      notification_type: 'Appointment Status Update',
      notification_details: `Your appointment request with ${username} has been ${userChoice}`,
    });
    res.send('Success');
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
