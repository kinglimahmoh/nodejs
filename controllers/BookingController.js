const { BookingRequest } = require('../models'); // Adjust the import based on your model file

class BookingController {

    constructor(submitBooking) {
        this.submitBooking = submitBooking;
      }

 async submitBooking (req, res) {
    try {
      // Extract form data from the request body
      const { name, email, checkInDate, checkOutDate, specialRequests } = req.body;

      // Create a new booking request in the database
      const newBooking = await BookingRequest.create({
        name,
        email,
        checkInDate,
        checkOutDate,
        specialRequests,
      });

      // Return a success response
      res.status(201).json({ message: 'Booking submitted successfully', booking: newBooking });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = BookingController;
