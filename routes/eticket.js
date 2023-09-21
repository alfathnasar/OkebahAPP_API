    const express = require('express');
    const eticketController = require('../controller/eticket.js');
    const router = express.Router();

    router.get('/:username/:id_pemesanan', eticketController.getDataPenumpang);

    module.exports = router;