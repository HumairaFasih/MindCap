const express = require('express');
const jwtDecode = require('jwt-decode');

const Appointments = require('../models/appointmentsModel');
const Notifications = require('../models/notificationsModel');
const Counselor = require('../models/counselorModel');
const Availability = require('../models/availabilityModel');
const MedicalRecord = require('../models/medicalModel');

const router = express.Router();

router.get('/get-all-counselors', async (req, res) => {
  try {
    const result = await Counselor.getAll();
    const usernames = [];
    result.forEach((item) => {
      usernames.push(item.username);
    });
    res.json(usernames);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/view', async (req, res) => {
  // get and decode jwt token
  const token = req.cookies.jwt;
  const jwtDecoded = jwtDecode(token);

  const { username, usertype } = jwtDecoded;

  // if student is viewing, then return all where student_id === username
  if (usertype === 'Student') {
    try {
      const result = await Appointments.find({ student_id: username });
      // console.log(result);
      res.send(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  // else counselor is viewing, then return all where counselor_id === username
  else if (usertype === 'Counselor') {
    try {
      const result = await Appointments.find({ counselor_id: username });
      
      res.send(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});

router.post('/get-availability', async (req, res) => {
  const result = await Availability.getDetails({
    counselor_username: req.body.counselor,
  });
  res.json({ day: result.day_type, time: result.time });
});

router.post('/book', async (req, res) => {
  const token = req.cookies.jwt;
  const jwtDecoded = jwtDecode(token);

  const { username, usertype } = jwtDecoded;

  if (usertype === 'Student') {
    try {
      // get data from request, add to appointment table, and generate notification as well for the counselor
      const { counselorUsername, meetingMode, date, time, share } = req.body;

      const dateFinal = new Date(new Date(date).getTime() + 300 * 60000);
      const timeFinal = new Date(new Date(time).getTime() + 300 * 60000);

      // share medical record with counselor logic here using the share variable
      await Appointments.create({
        student_id: username,
        counselor_id: counselorUsername,
        date: dateFinal,
        time: timeFinal,
        mode: meetingMode,
        status: 'Pending',
      });
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const dateStr = dateFinal.toLocaleDateString('en-US', options);
      const hours = timeFinal.getUTCHours();
      const minutes = timeFinal.getUTCMinutes();
      const meridian = hours >= 12 ? 'PM' : 'AM';
      const hours12 = hours % 12 || 12; // convert hours to 12-hour format
      const timeStr = `${hours12}:${minutes
        .toString()
        .padStart(2, '0')} ${meridian}`;
      await Notifications.create({
        username: counselorUsername,
        date: new Date(),
        time: new Date(),
        notification_type: 'Appointment Request',
        notification_details: `You have a new appointment request! A student, ${username} wishes to book an appointment with you on ${dateStr} at ${timeStr}.`,
      });
      if (share) {
        await MedicalRecord.addToVisibleTo(username, counselorUsername);
      }
      res.send('Appointment made!');
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }
});

router.post('/set-status', async (req, res) => {
  const token = req.cookies.jwt;
  const { username } = jwtDecode(token);

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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/cancel', async (req, res) => {
  // console.log("idhr aya", req.body)
  const { appointmentId } = req.body;
  try {
    await Appointments.update({ _id: appointmentId }, { status: 'Cancelled' });
    res.send('Success');
  } catch (err) {
    res.send('Failed');
  }
});

module.exports = router;
