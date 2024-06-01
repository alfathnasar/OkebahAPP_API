const eticketModels = require('../models/eticket.js');
const midtransClient = require('midtrans-client');
const purchasedModels = require('../models/purchased.js');

var FCM = require('fcm-node');
    var serverKey = 'AAAAfdaN1Sc:APA91bEthLbL5ExkT091bCdXp2DtoSgHdoziEJjFPd8QFJmYPCw7OhuhuncSwgBsw3-NkoVG1rNjbBaPTQ2Tbb3TNgEFxygzswdkKqApmGDGu-6-D2APEscDIXb25UpS0k3olvF2OQgh'; //put your server key here
    var fcm = new FCM(serverKey);
    

// Create Core API instance
const coreApi = new midtransClient.CoreApi({
    isProduction : false,
    clientKey : 'SB-Mid-client-SNUTQw3_NYOZkQlR',
    serverKey : 'SB-Mid-server-qZ7YQftleKExaQ_O2cMBb5kR'
});

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

const getDataPenumpangAgen = async (req, res) => {
    try {
        const {kode_speed, id_destinasi} = req.params;
        const [data] = await eticketModels.getDataPenumpangAgen(kode_speed, id_destinasi);
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

const filterEticket = async (req, res) => {
    const {kode_speed} = req.params;
    const {body} = req;
    try {
        const [data] = await eticketModels.getFilterEticket(body, kode_speed);
        res.status(200).json({
            data : data
        })
    } catch (error) {
        res.status(500).json({
            msg : 'SERVER ERROR',
            serverMsg : error
        });
    }
}

const updateStatusEticket = async (req, res) => {
    const { kode_booking } = req.params;
    try {
        const currentStatus = await eticketModels.getStatusEticket(kode_booking);
        
        if (currentStatus === 'check') {
            return res.status(200).json({
                msg: 'ETICKET SUDAH DIGUNAKAN'
            });
        }
        
        await eticketModels.updateStatusEticket(kode_booking);
        res.status(200).json({
            msg: 'CHECK IN BERHASIL'
        });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({
            msg: 'SERVER ERROR',
            serverMsg: error.message // Sending only the error message to avoid exposing stack trace
        });
    }
};

const getETicket = async (req, res) => {
    try {
        const {username, jenis_transportasi} = req.params;
        const [data] = await eticketModels.getETicket(username, jenis_transportasi);
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

const updatePurchasedStatus = async (req, res) => {
    try {
        const statusResponse = await coreApi.transaction.notification(req.body);
        let id_pemesanan = statusResponse.order_id;
        let respon_midtrans = JSON.stringify(statusResponse);
        let transactionStatus = statusResponse.transaction_status;

        console.log(transactionStatus);
        console.log(respon_midtrans);

        let token;
        let message;
        let responseSent = false;

        if (transactionStatus === 'settlement') {
            await eticketModels.updatePurchasedStatus(id_pemesanan, respon_midtrans);
            token = await eticketModels.getToken(id_pemesanan);
            message = {
                to: token, // Replace with the recipient's registration token
                collapse_key: 'your_collapse_key',
                notification: {
                    title: 'Pembayaran Berhasil',
                    body: 'Terima Kasih Untuk Pembayarannya, ETicket Kamu Sudah Terbit.',
                },
            };
        } else if (transactionStatus === 'cancel' || transactionStatus === 'expire') {
            await eticketModels.updatePurchasedStatus(id_pemesanan, respon_midtrans);
            token = await eticketModels.getToken(id_pemesanan);
            message = {
                to: token, // Replace with the recipient's registration token
                collapse_key: 'your_collapse_key',
                notification: {
                    title: 'Pembayaran Gagal',
                    body: 'Batas Waktu Pembayaran Anda Telah Habis',
                },
            };
        }
        
        //ERROR BAGIAN SINI
        if (message) {
            fcm.send(message, function(err, response) {
                if (responseSent) return; // Ensure we don't send multiple responses
                responseSent = true;
                if (err) {
                    console.log("NOTIFICATION GAGAL DIKIRIM = "+err)
                    res.status(500).json({
                        message: err,
                        token: token
                    });
                } else {
                    console.log("NOTIFICATION BERHASIL DIKIRIM = "+response)
                    res.status(200).json({
                        message: response,
                        token: token
                    });
                }
            });
        } else {
            res.status(200).json({
                message: "Berhasil",
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: req.body,
            serverMsg: error
        });
    }
};

module.exports = {
    getDataPenumpang,
    getETicket,
    updatePurchasedStatus,
    getDataPenumpangAgen,
    updateStatusEticket,
    filterEticket
}