const asyncErrorHandler = require('../utils/asyncErrorHandler')
const apiError = require('../services/apiError')

const isAdmin = asyncErrorHandler(async (req, res, next) => {
    const { roleCode } = req.user

    if (roleCode != 'R1')
        throw new apiError("Forbidden admin", 403, "AuthenticationException")

    next()
})

const isModerator = asyncErrorHandler(async (req, res, next) => {
    const { roleCode } = req.user

    if (roleCode != 'R2' && roleCode != 'R1') 
        throw new apiError("Forbidden moderator", 403, "AuthenticationException")

    console.log('oke')

    next()
})

module.exports = {
    isAdmin, isModerator
}