const express = require('express');
const cors = require('cors');
const sequelize = require('./models/index'); // Import Sequelize instance
const userRoutes = require('./routes/userroutes'); // Create user routes
const submitBooking = require('./routes/bookingRoutes');


const app = express();


// Middleware for parsing JSON request bodies
app.use(express.json());
app.use(cors());

// Define your routes
app.use('/api/users', userRoutes);

app.use('/submit-booking', submitBooking);



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



