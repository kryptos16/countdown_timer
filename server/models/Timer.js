const mongoose = require('mongoose');

const timerSchema = new mongoose.Schema({
  title: String,
  targetDate: Date,
}, { timestamps: true });

module.exports = mongoose.model('Timer', timerSchema);
