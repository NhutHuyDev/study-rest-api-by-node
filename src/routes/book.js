const router = require('express').Router()
const controllers = require('../controllers/book')
const verifyToken = require('../middlewares/verifyToken')
const { isAdmin, isModerator } = require('../middlewares/verifyRole')

//PUBLIC ROUTES
router.get('/', controllers.getBooks)

//PRIVATED ROUTES
router.use(verifyToken)

router.use(isModerator)

router.use(isAdmin)

module.exports = router

