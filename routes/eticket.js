    const express = require('express');
    const eticketController = require('../controller/eticket.js');
    const router = express.Router();

    router.get('/:username/:id_pemesanan', eticketController.getDataPenumpang);
    router.get('/checkin/:kode_speed/:id_destinasi', eticketController.getDataPenumpangAgen);
    router.get('/booking/:username/:jenis_transportasi', eticketController.getETicket);
    router.post('/', eticketController.updatePurchasedStatus);
    router.post('/filter/:id_destinasi', eticketController.filterEticket);
    router.patch('/checkin/:kode_booking', eticketController.updateStatusEticket);

    module.exports = router;