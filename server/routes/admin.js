const express = require('express');
const bcrypt = require('bcrypt');
const Counselor = require('../models/counselorModel');
const Student = require('../models/studentModel');

const router = express.Router();

router.post('/create-counselor', async (req, res) => {
  const { username, firstName, lastName, email, password, confirmPassword } =
    req.body;
  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }
  const existingUser = await Counselor.findOne({ username });
  if (existingUser) {
    return res.status(400).send('Username already exists');
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const result = await Counselor.create({
      username,
      email,
      password: hashedPassword,
      first_name: firstName,
      last_name: lastName,
    });
    console.log('Created user: ', result.username);
    res.status(201).send('User created');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  return null;
});

router.post('/change-status', async (req, res) => {
  const { username, accType, accStatus } = req.body;
  console.log(username, accType, accStatus);
  if (accType === 'Student') {
    try {
      // find the account in the student collection and change the status
      const account = await Student.find({ username: { $regex: username, $options: 'i' } });
      account[0].status = accStatus;
      await account[0].save();
      res.send('success');
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      console.log(username)
      const account = await Counselor.find({ username: { $regex: username, $options: 'i' } });
      console.log("MILA:", account);
      account[0].status = accStatus;
      await account[0].save();
      res.send('success');
    } catch (err) {
      console.log(err);
    }
  }
});

router.post('/delete-account', async (req, res) => {
  const { username, accType } = req.body;
  console.log(username, accType);
  if (accType === 'Student') {
    try {
      await Student.deleteOne({ username: { $regex: username, $options: 'i' } });
      res.send('success');
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      await Counselor.deleteOne({ username: { $regex: username, $options: 'i' } });
      res.send('success');
    } catch (err) {
      console.log(err);
    }
  }
});


module.exports = router;
