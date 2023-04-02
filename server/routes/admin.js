const express = require('express');
const bcrypt = require('bcrypt');
const Counselor = require('../models/counselorModel');

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

module.exports = router;
