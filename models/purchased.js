const dbPool = require('../config/database.js');

const setNewPurchased = (body, respon_midtrans) => {
    const sqlQuery = `INSERT INTO pemesanan_eticket values ('${body.id_pemesanan}', 
        '${body.kode_booking}',
        '${body.username}',
        '${body.id_destinasi}',
        '${body.nama_penumpang}',
        '${body.jk}',
        '${body.kendaraan}',
        '${body.plat_kendaraan}',
        '${body.id_transportasi}',
        '${body.id_destinasi_gol}',     
        '${body.tanggal}',
        '${body.pukul}',
        '${body.harga_total}',
        '${respon_midtrans}'
        )`;
    return dbPool.execute(sqlQuery);
}

const getPurchased = (username, transportasi) => {
    const sqlQuery = `SELECT DISTINCT pemesanan_eticket.id_pemesanan,pemesanan_eticket.id_destinasi,tanggal,pukul,harga_total,respon_midtrans, transportasi.jenis_transportasi, nama_transportasi, 
        destinasi.asal,tujuan,pelabuhan_asal_speed, pelabuhan_tujuan_speed, pelabuhan_asal_fery, pelabuhan_tujuan_fery
    FROM pemesanan_eticket
    JOIN transportasi ON pemesanan_eticket.id_transportasi = transportasi.id_transportasi
    JOIN destinasi ON pemesanan_eticket.id_destinasi = destinasi.id_destinasi
    WHERE pemesanan_eticket.username = '${username}'
        AND transportasi.jenis_transportasi = '${transportasi}' 
        AND JSON_EXTRACT(respon_midtrans, '$.transaction_status') = 'pending';`;
    return dbPool.execute(sqlQuery);
}

const deletePurchased = (username, id_pemesanan) => {
    const sqlQuery = `DELETE FROM pemesanan_eticket where id_pemesanan = '${id_pemesanan}';`;
    return dbPool.execute(sqlQuery);
}

module.exports = {
    setNewPurchased,
    getPurchased,
    deletePurchased
}