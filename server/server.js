const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load .env file

console.log("MONGO_URI:", process.env.MONGO_URI); // Optional: for debugging

const app = express();
app.use(express.json()); // Middleware to parse JSON

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('🚀 Server is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔊 Server running on port ${PORT}`));
