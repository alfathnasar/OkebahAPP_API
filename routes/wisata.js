const express = require('express');
const wisataController = require('../controller/wisata.js')

const router = express.Router();

router.get('/', wisataController.getDataWisata);

module.exports = router;
