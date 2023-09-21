const express = require('express');
const midtransorderController = require('../controller/midtransorder.js');
const router = express.Router();

router.post('/', midtransorderController.setNewOrderMidtrans);

module.exports = router;
