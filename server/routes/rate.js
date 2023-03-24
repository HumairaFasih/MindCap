const express = require('express');
const jwtDecode = require('jwt-decode');

const Reviews = require('../models/reviewsModel');

const router = express.Router();

router.post('/addreview', async (req, res) => {
  // access and decode token
  const token = req.cookies.jwt;
  console.log(token);
  const jwtDecoded = jwtDecode(token);

  // get id and usertype from the decoded token
  // const { id } = jwtDecoded;
  const { usertype } = jwtDecoded;

  // safety check to ensure only student can decode
  if (usertype === 'Student') {
    try {
      const { counselorusername, rating, review } = req.body;
      await Reviews.create({
        counselor_username: counselorusername,
        rating,
        review,
      });
      res.send('Success!');
    } catch (err) {
      res.send(err);
    }
  }
});

router.get('/:counselor/rating', async (req, res) => {
  // const token = req.cookies.jwt;
  // console.log(token);
  // const jwtDecoded = jwtDecode(token);

  // // get id and usertype from the decoded token
  // // const { id } = jwtDecoded;
  // const { usertype } = jwtDecoded;

  // safety check to ensure only student can decode
  console.log(req.params.counselor)
  try {
    // Fetch rating from MongoDB
    const { counselor } = req.params;
    console.log("COUNSELOR:", counselor)
    const reviews = await Reviews.getdetails({
      counselor_username: counselor
    });
    // go over each review and add the rating to the total
    let total = 0;
    for (let i = 0; i < reviews.length; i += 1) {
      total += reviews[i].rating;
    }
    // divide the total by the number of reviews to get the average
    const rating = total / reviews.length;
    console.log("Rating:", rating);
    res.json({ rating });
  } catch (err) {
    res.send(err);
  }


});

module.exports = router;