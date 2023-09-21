const shceduleModels = require('../models/schedule.js');

const getSchedules = async (req, res) => {
    try {
        const {body} = req;    
        const [data] = await shceduleModels.getSchedule(body);
        res.status(201).json({
            data : data
        })
    } catch (error) {
        res.status(500).json({
            msg : 'Server Error',
            serverMsg : error,
        })
    }
}

module.exports = {
    getSchedules
}