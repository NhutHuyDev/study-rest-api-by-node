const UserServices = require('../services/user')
const userServices = new UserServices()
const asyncErrorHandler = require('../utils/asyncErrorHandler')

const getCurrentUser = asyncErrorHandler(async (req, res) => {
    const { id } = req.user

    const response = await userServices.getUser(id)

    res.json(response)
})

module.exports = {
    getCurrentUser
}