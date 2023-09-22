const dbPool = require('../config/database.js');

const getDataPenumpang = (username,id_pemesanan) => {
    const sqlQuery = `SELECT kode_booking, nama_penumpang, jk
    from pemesanan_eticket
    where username = '${username}' && id_pemesanan = '${id_pemesanan}';`;
    return dbPool.execute(sqlQuery);
}

const updatePurchasedStatus = (id_pemesanan, respon_midtrans) => {
    const sqlQuery = `UPDATE pemesanan_eticket SET respon_midtrans= '${respon_midtrans}'
    where id_pemesanan = '${id_pemesanan}';`;
    return dbPool.execute(sqlQuery);
}

module.exports = {
    getDataPenumpang,
    updatePurchasedStatus
}