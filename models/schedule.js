const dbPool = require ('../config/database.js');

const getSchedule = (body) => {
    const sqlQuery = `SELECT jadwal_keberangkatan.*, transportasi.nama_transportasi,jenis_transportasi, 
    destinasi.asal,tujuan,pelabuhan_asal_fery,pelabuhan_tujuan_fery,pelabuhan_asal_speed,pelabuhan_tujuan_speed FROM 
    jadwal_keberangkatan, transportasi, destinasi
    where transportasi.jenis_transportasi = '${body.transportasi}' 
    && jadwal_keberangkatan.id_transportasi=transportasi.id_transportasi 
    && jadwal_keberangkatan.id_destinasi = destinasi.id_destinasi 
    && destinasi.asal='${body.asal}' 
    && destinasi.tujuan='${body.tujuan}' 
    && jadwal_keberangkatan.tanggal='${body.tanggal}' order by pukul`;
    
    return dbPool.execute(sqlQuery);
}

module.exports = {
    getSchedule
}