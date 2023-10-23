const midtransClient = require('midtrans-client');
// Create Core API instance
const coreApi = new midtransClient.CoreApi({
    isProduction : false,
    serverKey : 'Mid-server-pGKSF6N7-jurdynpscsRvTuG',
    clientKey : 'Mid-client-DOUoyWAyeJREnEY3'
});


const setNewOrderMidtrans = (req, res) => {
    const {body} = req;
    coreApi.charge(body)
    .then((chargeResponse)=>{
        console.log('chargeResponse:',JSON.stringify(chargeResponse));
        res.status(201).json({
            status : 'Berhasil'
        });
    })
    .catch((e)=>{
        console.log('Error occured:',e.message);
        res.status(500).json({
            status : false,
            serverMsg : e.message
        });
    });;
};

module.exports = {
    setNewOrderMidtrans
};