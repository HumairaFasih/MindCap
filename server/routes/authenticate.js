// Router that handles requests sent to the /api/authenticate route
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const Admin = require('../models/adminModel');
const Counselor = require('../models/counselorModel');
const Student = require('../models/studentModel');


require('dotenv').config();

const router = express.Router();

// 1 day expire time
const expireTime = 1 * 24 * 60 * 60;

// function for generating tokens
const createToken = (id, username, usertype) =>
  jwt.sign({ id, username, usertype }, process.env.JWT_SECRET, {
    expiresIn: expireTime,
  });

// find and match credentials, if successful set jwt cookie and respond back with object id
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // try catch hell since we wont have jwt token and thus no usertype to make search easier
  try {
    const student = await Student.login(username, password);
    const jwtToken = createToken(student.id, student.username, 'Student');
    const jwtDecoded = jwtDecode(jwtToken);
    console.log(jwtDecoded);
    res.cookie('jwt', jwtToken, { maxAge: expireTime * 1000 });
    res.json({ id: student.id });
  } catch (_) {
    try {
      const counselor = await Counselor.login(username, password);
      const jwtToken = createToken(
        counselor.id,
        counselor.username,
        'Counselor'
      );
      res.cookie('jwt', jwtToken, { maxAge: expireTime * 1000 });
      res.json({ id: counselor.id });
    } catch (__) {
      try {
        const admin = await Admin.login(username, password);
        const jwtToken = createToken(admin.id, admin.username, 'Admin');
        res.cookie('jwt', jwtToken, { maxAge: expireTime * 1000 });
        res.json({ id: admin.id });
      } catch (err) {
        res.send(err);
      }
    }
  }
});

router.post('/create-account', async (req, res) => {
  const { username, firstName, lastName, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match");
  }
  const existingUser = await Counselor.findOne({ username });
  if (existingUser) {
    return res.status(400).send("Username already exists");
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
    res.status(201).send("User created");
    res.redirect("/");
  } catch (error) {
    res.send(error)
  }
  return null;
  
});

module.exports = router;
