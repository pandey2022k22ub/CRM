const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); 

// Route imports
const campaigns = require('./src/routes/campaigns');
const segments = require('./src/routes/segments');
const insights = require('./src/routes/insights'); 

const app = express(); // ✅ Define app BEFORE using it

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('✅ MongoDB Connected to Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Route usage AFTER app is declared
app.use('/api/campaigns', campaigns);
app.use('/api/segments', segments);
app.use('/api/insights', insights); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
