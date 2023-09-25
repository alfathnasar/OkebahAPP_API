const dbPool = require('../config/database.js');

const getDataPenumpang = (username,id_pemesanan) => {
    const sqlQuery = `SELECT kode_booking, nama_penumpang, jk, respon_midtrans
    from pemesanan_eticket
    where username = '${username}' && id_pemesanan = '${id_pemesanan}';`;
    return dbPool.execute(sqlQuery);
}

const getETicket = (username, jenis_transportasi) => {
    const sqlQuery = `SELECT eticket.kode_booking,eticket.id_destinasi,tanggal,pukul,nama_penumpang,jk, transportasi.jenis_transportasi, nama_transportasi, 
    destinasi.asal,tujuan,pelabuhan_asal_speed, pelabuhan_tujuan_speed, pelabuhan_asal_fery, pelabuhan_tujuan_fery
    FROM eticket
    JOIN transportasi ON eticket.id_transportasi = transportasi.id_transportasi
    JOIN destinasi ON eticket.id_destinasi = destinasi.id_destinasi
    WHERE eticket.username = '${username}'
    AND transportasi.jenis_transportasi = '${jenis_transportasi}'`;
    return dbPool.execute(sqlQuery);
}

const updatePurchasedStatus = (id_pemesanan, respon_midtrans) => {
    const sqlQuery = `UPDATE pemesanan_eticket SET respon_midtrans= '${respon_midtrans}'
    where id_pemesanan = '${id_pemesanan}';`;
    return dbPool.execute(sqlQuery);
}

module.exports = {
    getDataPenumpang,
    getETicket,
    updatePurchasedStatus
}