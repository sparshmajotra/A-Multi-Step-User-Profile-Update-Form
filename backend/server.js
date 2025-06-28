const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;
const userRoutes = require('./routes/userRoutes');
const locationRoutes = require('./routes/locationRoutes');


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // Added to parse URL-encoded form data
app.use(cors());
app.use('/uploads', express.static('uploads')); // serve profile images
app.use('/api/users', userRoutes);
app.use('/api/locations', locationRoutes);
app.use(cors({ origin: 'https://your-frontend.onrender.com' }));



// MongoDB connection string 
const uri = 'mongodb+srv://spaarrsh:Adity%40777@demo.d9a6b98.mongodb.net/userprofiles?retryWrites=true&w=majority';

mongoose.connect(uri)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Simple test route
app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(PORT, () => {
  console.log(`✅ Server started on http://localhost:${PORT}`);
});
