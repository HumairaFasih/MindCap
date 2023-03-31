/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const jwtDecode = require('jwt-decode');

const router = express.Router();

router.get('/currentuser', async (req, res) => {
  // get currently logged in user's details using their token
  const token = req.cookies.jwt;
  const jwtDecoded = jwtDecode(token);
  console.log('Printing jwtDecoded');
  console.log(jwtDecoded);
  const { usertype, username } = jwtDecoded;
  res.json({ usertype, username });
});

module.exports = router;
