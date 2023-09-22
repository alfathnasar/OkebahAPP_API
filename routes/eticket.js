    const express = require('express');
    const eticketController = require('../controller/eticket.js');
    const router = express.Router();

    router.get('/:username/:id_pemesanan', eticketController.getDataPenumpang);
    router.post('/', eticketController.updatePurchasedStatus);

    module.exports = router;