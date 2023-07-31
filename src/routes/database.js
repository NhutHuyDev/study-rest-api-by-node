const router = require('express').Router()
const controllers = require('../controllers/database')

//PUBLIC ROUTES
router.get('/', controllers.insert)

module.exports = router

