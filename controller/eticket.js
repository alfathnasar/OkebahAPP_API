const eticketModels = require('../models/eticket.js');

const getDataPenumpang = async (req, res) => {
    try {
        const {username, id_pemesanan} = req.params;
        const [data] = await eticketModels.getDataPenumpang(username, id_pemesanan);
        res.status(200).json({
            data : data
        });
    } catch (error) {
        res.status(500).json({
            msg : 'SERVER ERROR',
            serverMsg : error,
        })
    }
}

module.exports = {
    getDataPenumpang
}