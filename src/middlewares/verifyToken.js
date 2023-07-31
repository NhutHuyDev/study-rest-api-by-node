const asyncErrorHandler = require('../utils/asyncErrorHandler')
const apiError = require('../services/apiError')
const jwt = require('jsonwebtoken')

const verifyToken = asyncErrorHandler(async (req, res, next) => {
    const authorizationToken = req.headers.authorization

    if (!authorizationToken)
        throw new apiError("unAuthentication", 401, "AuthenticationException")

    const accessToken = authorizationToken.split(' ')[1]

    jwt.verify(accessToken, process.env.JWT_SECRET_TOKEN, (err, decode) => {
        if (err)
            throw new apiError("access token may be expired or invalid", 401, "AuthenticationException")

        req.user = decode

        next()
    })
})

module.exports = verifyToken

