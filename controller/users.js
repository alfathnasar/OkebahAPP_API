const userModels = require('../models/users.js')

const getUsers = async (req, res) => {
    try {
        const {username} = req.params;
        const [data] = await userModels.getUsers(username);
        res.status(200).json({
            data : data
        })
    } catch (error) {
        res.status(500).json({
            msg : 'Server Error',
            serverMsg : error,
        })
    }
}

const createNewUser = async (req, res) => {
    const {body} = req;
    try {
        await userModels.createNewUser(body);
        res.status(201).json({
            })
    } catch (error) {
        res.status(500).json({
            msg : 'SERVER ERROR',
            serverMsg : error,
        })
    }
}

const updateUser = async (req, res) => {
    const {username} = req.params;
    const {body} = req;
    try {
        await userModels.updateUser(body, username);
        res.status(200).json({
        });
    } catch (error) {
        res.status(500).json({
            msg : 'SERVER ERROR',
            serverMsg : error
        });
    }
}

const deleteUser = async (req, res) => {
    const {username} = req.params;
    try {
        await userModels.deleteUser(username);
        res.status(200).json({
        });
    } catch (error) {
        res.status(500).json({
            msg : 'SERVER ERROR',
            serverMsg : error
        });
    }
}

module.exports = {
    getUsers,
    createNewUser,
    updateUser,
    deleteUser
}