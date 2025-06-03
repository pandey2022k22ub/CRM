const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load .env variables

// Correct route paths
const campaigns = require('./src/routes/campaigns');
const segments = require('./src/routes/segments');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, {
  
})
.then(() => console.log('Mongodb Connected to Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/campaigns', campaigns);
app.use('/api/segments', segments);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
