/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const jwtDecode = require('jwt-decode');

const router = express.Router();

router.get('/current-user', async (req, res) => {
  // get currently logged in user's details using their token
  const token = req.cookies.jwt;
  const jwtDecoded = jwtDecode(token);
  console.log('Printing jwtDecoded');
  console.log(jwtDecoded);
  res.json({ usertype: jwtDecoded.usertype, username: jwtDecoded.username });
});

module.exports = router;
