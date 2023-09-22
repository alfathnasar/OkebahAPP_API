const eticketModels = require('../models/eticket.js');
const midtransClient = require('midtrans-client');
// Create Core API instance
const coreApi = new midtransClient.CoreApi({
    isProduction : false,
    serverKey : 'SB-Mid-server-qZ7YQftleKExaQ_O2cMBb5kR',
    clientKey : 'SB-Mid-client-SNUTQw3_NYOZkQlR'
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

const updatePurchasedStatus = (req, res) => {
    try {
        coreApi.transaction.notification(req.body)
        .then(async (statusResponse)=>{
            let id_pemesanan = statusResponse.order_id;
            let respon_midtrans = JSON.stringify(statusResponse);

            if (transactionStatus == 'settlement'){
                await eticketModels.updatePurchasedStatus(username, id_pemesanan, respon_midtrans);
                res.status(200).json({
                    msg : 'SETTLEMENT'
                });
            } else if (transactionStatus == 'cancel' || transactionStatus == 'expire'){
                await eticketModels.updatePurchasedStatus(username, id_pemesanan, respon_midtrans);
                res.status(200).json({
                    msg : 'CANCEL Or EXPIRE'
                });
            } else if (transactionStatus == 'pending'){
                // TODO set transaction status on your databaase to 'pending' / waiting payment
                res.status(200).json({
                    msg : 'PENDING'
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            msg : 'SERVER ERROR',
            serverMsg : error
        });
    }
}

module.exports = {
    getDataPenumpang,
    updatePurchasedStatus
}