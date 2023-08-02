const router = require('express').Router()
const controllers = require('../controllers/book')
const verifyToken = require('../middlewares/verifyToken')
const uploadCloud = require('../middlewares/uploader')
const { isAdmin, isModerator } = require('../middlewares/verifyRole')

//PUBLIC ROUTES
router.get('/', controllers.getBooks)

//PRIVATED ROUTES
router.use(verifyToken)

router.use(isModerator)
router.post('/', uploadCloud('/books').single("image"), controllers.createBook)
router.put('/', uploadCloud('/books').single("image"), controllers.updateBook)
router.delete('/', controllers.deleteBook)

router.use(isAdmin)

module.exports = router

