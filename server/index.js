const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

// Initialize Firebase Admin
require('./firebaseAdmin');

const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('Dolfin Xerox API is Running...');
});

// Port configuration
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (Optional Fallback)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dolfin_xerox')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error (Mock mode active):', err.message);
  });

// Start the server (listening on all interfaces for network access)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Local Network: http://0.0.0.0:${PORT}`);
});
