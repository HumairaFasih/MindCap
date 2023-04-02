const express = require('express');
const jwtDecode = require('jwt-decode');

const Reviews = require('../models/reviewsModel');

const router = express.Router();

router.post('/add-review', async (req, res) => {
  // access and decode token
  const token = req.cookies.jwt;
  console.log(token);
  const jwtDecoded = jwtDecode(token);

  // get usertype from the decoded token
  const { usertype } = jwtDecoded;

  // safety check to ensure only student can decode
  if (usertype === 'Student') {
    try {
      const { username, rating, content } = req.body;
      await Reviews.create({
        counselor_username: username,
        rating,
        review: content,
      });
      res.send('Review added!');
    } catch (error) {
      res.send(500).json({ error: error.message });
    }
  }
});

router.get('/getreviews', async (req, res) => {
  // access and decode token
  const token = req.cookies.jwt;
  console.log(token);
  const jwtDecoded = jwtDecode(token);

  // get id and usertype from the decoded token
  // const { id } = jwtDecoded;
  const { usertype } = jwtDecoded;
  const { username } = jwtDecoded;

  let counselorUsername;
  // if student or admin is accessing reviews, then counselor's username is in the request, otherwise the username is in the token.
  if (usertype === 'Student' || usertype === 'Admin') {
    counselorUsername = req.body.counselorusername;
  } else {
    counselorUsername = username;
  }
  try {
    const reviews = await Reviews.getDetails({
      counselor_username: counselorUsername,
    });
    res.send([...reviews]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
