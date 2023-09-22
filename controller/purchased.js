const purchasedModels = require('../models/purchased.js');
const midtransClient = require('midtrans-client');
// Create Core API instance
const coreApi = new midtransClient.CoreApi({
    isProduction : false,
    serverKey : 'SB-Mid-server-qZ7YQftleKExaQ_O2cMBb5kR',
    clientKey : 'SB-Mid-client-SNUTQw3_NYOZkQlR'
});


const setNewPurchased = async (req, res) => {
    const { data_penumpang } = req.body;
    try {
        await coreApi.charge(req.body)
        .then((chargeResponse)=>{
            console.log('chargeResponse:', JSON.stringify(chargeResponse));    
            for (const purchaseData of data_penumpang) {
                purchasedModels.setNewPurchased(purchaseData, JSON.stringify(chargeResponse));
            }
            res.status(201).json({
                respon: JSON.stringify(chargeResponse)
            });
        });

    } catch (error) {
        res.status(500).json({
            msg: 'SERVER ERROR',
            serverMsg: error.message,
        });
    }
}


const getPurchased = async (req, res) => {
    try {
        const {username, transportasi} = req.params;
        const [data] = await purchasedModels.getPurchased(username, transportasi);
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
                await purchasedModels.updatePurchasedStatus(username, id_pemesanan, respon_midtrans);
                res.status(200).json({
                    msg : 'SETTLEMENT'
                });
            }else if (transactionStatus == 'cancel' || transactionStatus == 'expire'){
                await purchasedModels.updatePurchasedStatus(username, id_pemesanan, respon_midtrans);
                res.status(200).json({
                    msg : 'CANCEL Or EXPIRE'
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
    setNewPurchased,
    getPurchased,
    updatePurchasedStatus
}