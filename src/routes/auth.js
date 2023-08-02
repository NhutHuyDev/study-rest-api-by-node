const router = require('express').Router()
const controllers = require('../controllers/auth')

router.post('/login', controllers.login)

router.post('/register', controllers.register)

router.get('/refresh-token', controllers.refreshAccessToken)

module.exports = router

