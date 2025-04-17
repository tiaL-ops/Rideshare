const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
const driverRoutes = require('./routes/driverRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const gasRoutes = require('./routes/gasRoutes');

app.use('/drivers', driverRoutes);
app.use('/bookings', bookingRoutes);
app.use('/gas', gasRoutes);


app.get('/', (req, res) => {
  res.send('Lafayette Rideshare API is running 🚗');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
