const asyncErrorHandler = require('../utils/asyncErrorHandler')
const AuthServices = require('../services/auth')
const authServices = new AuthServices() 

const register = asyncErrorHandler(async (req, res) => {
    const response = await authServices.register(req.body)

    res.json(response)
})

const login = asyncErrorHandler(async (req, res) => {
    const response = await authServices.login(req.body)

    return res.json(response)
})

module.exports = {
    register, login
}