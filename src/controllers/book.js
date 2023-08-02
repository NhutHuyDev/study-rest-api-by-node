const BookServices = require('../services/book')
const bookServices = new BookServices()
const asyncErrorHandler = require('../utils/asyncErrorHandler')

const createBook = asyncErrorHandler(async (req, res) => {
    console.log( req.file)
    req.file && (req.body.file = req.file)
    const response = await bookServices.createBook(req.body)
    res.json(response)
})

const getBooks = asyncErrorHandler(async (req, res) => {
    const response = await bookServices.getBooks(req.query)
    res.json(response)
})

const updateBook = asyncErrorHandler(async (req, res) => {
    req.file && (req.body.file = req.file)
    const response = await bookServices.updateBook(req.body)
    res.json(response)
})

const deleteBook = asyncErrorHandler(async (req, res) => {
    const response = await bookServices.deleteBooks(req.query)
    res.json(response)
})

module.exports = {
    createBook,
    getBooks,
    updateBook,
    deleteBook
}