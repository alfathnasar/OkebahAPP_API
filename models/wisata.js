const dbPool = require('../config/database.js');

const getDataWisata = () => {
    const sqlQuery = `SELECT *FROM wisata;`;
    return dbPool.execute(sqlQuery);
}

module.exports = {
    getDataWisata
}