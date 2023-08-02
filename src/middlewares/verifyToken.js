const asyncErrorHandler = require('../utils/asyncErrorHandler')
const apiError = require('../services/apiError')
const jwt = require('jsonwebtoken')

const verifyToken = asyncErrorHandler(async (req, res, next) => {
    const authorizationToken = req.headers.authorization

    if (!authorizationToken)
        throw new apiError("unAuthentication", 401, "AuthenticationException")

    const accessToken = authorizationToken.split(' ')[1]

    jwt.verify(accessToken, process.env.JWT_SECRET_KEY_ACCESS_TOKEN, (err, decode) => {
        if (err) {
            const expiredToken = err instanceof jwt.TokenExpiredError

            if (expiredToken) {
                throw new apiError("access token is expired", 401, { expiredToken: true })
            } else {
                throw new apiError("access token is invalid", 401, { invalidToken: true })
            }
        }

        req.user = decode

        next()
    })
})

module.exports = verifyToken

