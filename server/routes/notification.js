// Router that handles requests sent to the /api/notification route
const express = require('express');

// create a router
const router = express.Router();

// get all notifications
router.get('/:username', (req, res) => {
  res.send({
    dummyResponse: `getting all notifications for a user by username`,
  });
});

// router.post()
// router.delete()
// router.patch()

module.exports = router;
