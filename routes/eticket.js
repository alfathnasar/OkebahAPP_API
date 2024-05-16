    const express = require('express');
    const eticketController = require('../controller/eticket.js');
    const router = express.Router();

    router.get('/:username/:id_pemesanan', eticketController.getDataPenumpang);
    router.get('/:kode_speed', eticketController.getDataPenumpangAgen);
    router.get('/booking/:username/:jenis_transportasi', eticketController.getETicket);
    router.post('/', eticketController.updatePurchasedStatus);

    module.exports = router;