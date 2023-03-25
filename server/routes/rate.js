const express = require('express');
const jwtDecode = require('jwt-decode');

const Reviews = require('../models/reviewsModel');

const router = express.Router();

router.post('/addreview', async (req, res) => {
  // access and decode token
  const token = req.cookies.jwt;
  console.log(token);
  const jwtDecoded = jwtDecode(token);

  // // get id and usertype from the decoded token
  const { usertype } = jwtDecoded;

  // safety check to ensure only student can decode
  if (usertype === 'Student') {
    try {
      const { counselorusername, rating, content } = req.body;
      await Reviews.create({
        counselor_username: counselorusername,
        rating,
        review: content
      });
      res.send('Success!');
    } catch (err) {
      res.send(err);
    }
  }
});

module.exports = router;