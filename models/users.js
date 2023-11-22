const dbPool = require('../config/database.js');

const getUsers = (username) => {
    const sqlQuery = `SELECT *from pengguna where username = '${username}'`;
    return dbPool.execute(sqlQuery);
}

const createNewUser = (body) => {
    const sqlQuery = `INSERT INTO pengguna (username, nama, nohp, email, password, token) 
                    values ('${body.username}', '${body.nama}', '${body.nohp}', '${body.email}', '${body.password}', '${body.token}')`;
    return dbPool.execute(sqlQuery);    
}

const updateUser = (body, username) => {
    const sqlQuery = `UPDATE pengguna SET nama='${body.nama}', nohp='${body.nohp}', 
                    email='${body.email}', password='${body.password}' where username ='${username}'`;
    return dbPool.execute(sqlQuery);
}

const updateUserToken = (username, token) => {
    const sqlQuery = `UPDATE pengguna SET token ='${token}' where username ='${username}'`;
    return dbPool.execute(sqlQuery);
}

const deleteUser = (username) => {
    const sqlQuery = `DELETE FROM pengguna where username = '${username}'`;
    return dbPool.execute(sqlQuery);
}

module.exports = {
    getUsers,
    createNewUser,
    updateUser,
    updateUserToken,
    deleteUser
}