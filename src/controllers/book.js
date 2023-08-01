const BookServices = require('../services/book')
const bookServices = new BookServices()
const asyncErrorHandler = require('../utils/asyncErrorHandler')

const getBooks = asyncErrorHandler(async (req, res) => {
    const response = await bookServices.getBooks(req.query)
    res.json(response)
})

module.exports = {
    getBooks
}