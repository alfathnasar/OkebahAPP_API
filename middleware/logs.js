const logs = (req, res, next) => {
    console.log('Log Terjadi Di Path : ', req.path)
    next()
}

module.exports = logs