const express = require('express');
const jwtDecode = require('jwt-decode');
const Appointments = require('../models/appointmentsModel');
const Notifications = require('../models/notificationsModel');
const Counselor = require('../models/counselorModel');
const Availability = require('../models/availabilityModel');

const router = express.Router();

router.post('/book', async (req, res) => {
  // get and decode jwt token
  const token = req.cookies.jwt;
  const jwtDecoded = jwtDecode(token);

  const { username, usertype } = jwtDecoded;

  if (usertype === 'Student') {
    try {
      // get data from request, add to appointment table, and generate notification as well for the counselor
      const { counselorUsername, meetingMode, date, time } = req.body;

      const dateFinal = new Date(new Date(date).getTime() + 300*60000);
      const timeFinal = new Date(new Date(time).getTime() + 300*60000);

      // insert share medical record with counselor logic here using the share variable
      await Appointments.create({
        student_id: username,
        counselor_id: counselorUsername,
        date: dateFinal,
        time: timeFinal,
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
      console.log(err);
      res.send(err);
    }
  }
});

router.get('/get-all-counselors', async (req, res) => {
  const result = await Counselor.getAll();
  const usernames = [];
  result.forEach((item) => {
    usernames.push(item.username);
  });
  res.json(usernames);
});

router.post('/get-availability', async (req, res) => {
  const result = await Availability.getDetails({
    counselor_username: req.body.counselor,
  });
  res.json({ day: result.day_type, time: result.time });
});

module.exports = router;
