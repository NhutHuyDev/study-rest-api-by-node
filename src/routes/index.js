const user = require('./users')
const auth = require('./auth')
const book = require('./book')
const database = require('./database')
const apiError = require('../services/apiError')
const globalErrorHandler = require('../controllers/errorHandler')

const initRoutes = (app) => {

    app.use('/api/v1/auth', auth)
    app.use('/api/v1/users', user)
    app.use('/api/v1/book', book)
    app.use('/api/v1/database', database)

    app.use('*', (req, res, next) => {
        const error = new apiError(`Cannot find ${req.originalUrl} on the server`, 404)
        next(error)
    })

    app.use(globalErrorHandler)
}

module.exports = initRoutes