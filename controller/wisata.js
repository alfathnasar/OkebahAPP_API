const wisataModels = require('../models/wisata.js')

const getDataWisata = async (req, res) => {
        const [data] = await wisataModels.getDataWisata();
        res.status(200).json({
            data : data
        })
    
}

module.exports = {
    getDataWisata
}
