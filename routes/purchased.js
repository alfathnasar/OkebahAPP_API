    const express = require('express');
    const purchasedController = require('../controller/purchased.js');
    const router = express.Router();

    router.post('/', purchasedController.setNewPurchased);
    router.get('/all/:username', purchasedController.getAllPurchased);
    router.get('/:username/:transportasi', purchasedController.getPurchased);
    router.delete('/:username/:idPemesanan', purchasedController.deletePurchased);

    module.exports = router;