const express = require('express');
const jwtDecode = require('jwt-decode');
const Complaints = require('../models/complaintsModel');
const Notification = require('../models/notificationsModel');

const router = express.Router();

router.post('/lodge', async (req, res) => {
  // get and decode jwt token
  const token = req.cookies.jwt;
  const jwtDecoded = jwtDecode(token);

  const { username, usertype } = jwtDecoded;

  if (usertype === 'Student') {
    try {
      const { counselor, complaintType, complaintDetails } = req.body;
      // create complaint
      await Complaints.create({
        counselor_username: counselor,
        type: complaintType,
        filed_date: new Date(),
        details: complaintDetails,
        status: 'Pending',
      });
      // create notification for student
      await Notification.create({
        username,
        date: new Date(),
        time: new Date(),
        notification_type: 'New Complaint Lodged',
        notification_details: `Your complaint against counselor ${counselor} has been received. Please wait while our administrative staff handles the case. We apologize for the inconvenience.`,
      });
      // create notification for admin
      await Notification.create({
        username: 'admin',
        date: new Date(),
        time: new Date(),
        notification_type: 'New Complaint Lodged',
        notification_details: `A ${complaintType} complaint has been lodged against counselor ${counselor}.`,
      });
      res.send('Complaint created!');
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
});

router.get('/view', async (req, res) => {
  // get and decode jwt token
  const token = req.cookies.jwt;
  const jwtDecoded = jwtDecode(token);

  const { usertype } = jwtDecoded;
  if (usertype === 'Admin') {
    try {
      const result = await Complaints.find({});
      res.send(result);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
});

router.post('/resolve', async (req, res) => {
  // get and decode jwt token
  const token = req.cookies.jwt;
  const jwtDecoded = jwtDecode(token);

  const { usertype } = jwtDecoded;
  if (usertype === 'Admin') {
    try {
      const { complaintId } = req.body;
      await Complaints.update({ _id: complaintId }, { status: 'Resolved' });
      res.send('Complaint Resolved!');
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
});

module.exports = router;
