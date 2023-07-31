class apiError extends Error {
    constructor(message, code, data = 'Exception') {
        super(message)
        this.code = code
        this.status = code >= 400 && code <= 500 ? 'error' : 'fail'
        this.data = data

        this.isOperational = true

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = apiError