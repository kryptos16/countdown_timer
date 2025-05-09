const Timer = require('../models/Timer');

const createTimer = async (req, res) => {
  try {
    const { title, targetDate } = req.body;
    const newTimer = await Timer.create({ title, targetDate });
    res.status(201).json(newTimer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTimers = async (req, res) => {
  try {
    const timers = await Timer.find().sort({ createdAt: -1 });
    res.status(200).json(timers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createTimer, getTimers };
