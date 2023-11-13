const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/BookingController');

// Route to submit bookings
router.post('/submit-booking', BookingController.submitBooking);

module.exports = router;
