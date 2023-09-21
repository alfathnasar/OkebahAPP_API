const express = require ('express');
const scheduleController = require ('../controller/schedule.js');

const router = express.Router();

router.post('/', scheduleController.getSchedules);

module.exports = router;