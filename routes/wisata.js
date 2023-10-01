const express = require('express');
const wisataController = require('../controller/wisata.js')

const router = express.Router();

router.post('/', wisataController.getDataWisata);

module.exports = router;
