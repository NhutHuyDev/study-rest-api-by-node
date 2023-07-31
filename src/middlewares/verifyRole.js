const asyncErrorHandler = require('../utils/asyncErrorHandler')
const apiError = require('../services/apiError')

const isAdmin = asyncErrorHandler(async (req, res, next) => {
    const { role_code } = req.user

    if (role_code != 'R1')
        throw new apiError("Forbidden admin", 403, "AuthenticationException")

    next()
})

const isModerator = asyncErrorHandler(async (req, res, next) => {
    const { role_code } = req.user

    if (role_code != 'R2')
        throw new apiError("Forbidden moderator", 403, "AuthenticationException")

    next()
})

module.exports = {
    isAdmin, isModerator
}