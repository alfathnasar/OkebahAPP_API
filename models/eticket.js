const dbPool = require('../config/database.js');

const getDataPenumpang = (username,id_pemesanan) => {
    const sqlQuery = `SELECT nama_penumpang, jk, respon_midtrans, transportasi.id_transportasi, jenis_transportasi
    from pemesanan_eticket, transportasi
    where username = '${username}' && id_pemesanan = '${id_pemesanan}' && pemesanan_eticket.id_transportasi = transportasi.id_transportasi;`;
    return dbPool.execute(sqlQuery);
}

const getDataPenumpangAgen = (username) => {
    const sqlQuery = `SELECT *FROM pengguna
    where username = '${username}';`;
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

const getToken = async (id_pemesanan) => {
    const sqlQuery = `
    SELECT DISTINCT pemesanan_eticket.id_pemesanan, pengguna.token 
    FROM pemesanan_eticket, pengguna
    WHERE pemesanan_eticket.username = pengguna.username AND
    pemesanan_eticket.id_pemesanan = '${id_pemesanan}';
    `;

    try {
        const [rows, fields] = await dbPool.execute(sqlQuery);

        if (rows.length > 0) {
            // Assuming that 'token' is the name of the column in your database
            const token = rows[0].token;
            return token;
        } else {
            // Handle the case where no token is found for the given id_pemesanan
            return null;
        }
    } catch (error) {
        console.error('Error retrieving token from the database:', error);
        res.status(500).json({
            message: 'Error retrieving token from the database',
            error: error.message
        });
    }
}

module.exports = {
    getDataPenumpang,
    getETicket,
    updatePurchasedStatus,
    getToken,
    getDataPenumpangAgen
}