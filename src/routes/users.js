const router = require('express').Router()
const controllers = require('../controllers/user')
const verifyToken = require('../middlewares/verifyToken')
const { isAdmin, isModerator } = require('../middlewares/verifyRole')

//PUBLIC ROUTES

//PRIVATED ROUTES
router.use(verifyToken)
router.get('/', controllers.getCurrentUser)

router.use(isModerator)

router.use(isAdmin)

module.exports = router

