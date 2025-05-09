const express = require('express');
const { createTimer, getTimers } = require('../controllers/timerController');

const router = express.Router();

router.post('/', createTimer);
router.get('/', getTimers);

module.exports = router;
