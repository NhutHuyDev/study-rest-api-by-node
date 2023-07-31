module.exports = (error, req, res, next) => {
    console.error(error)
    error.code = error.code || 500
    error.status = error.status || 'error'
    error.data = error.data 
    res.json({
        code: error.code,
        status: error.status,
        message: error.message,
        data: error.data
    })
}
