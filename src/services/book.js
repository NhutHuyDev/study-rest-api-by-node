const db = require('../models')
const { Op } = require('sequelize')
const { v4 } = require('uuid')
const apiError = require('../services/apiError')
const cloudinary = require('cloudinary').v2


class BookServices {
    constructor() {
    }

    // CREATE
    createBook(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const [book, created] = await db.Book.findOrCreate({
                    where: { title: body.title },
                    defaults: {
                        id: v4(),
                        ...body,
                        image: body.file ? body.file.path : 'https://res.cloudinary.com/dvrknnoaf/image/upload/v1690951030/study-rest-api-by-node/books/blank-book_aksbfm.png',
                        imageFileName: body.file ? body.file.filename : '/study-rest-api-by-node/books/blank-book_aksbfm.png'
                    }
                })

                if (created) {
                    resolve({
                        code: 201,
                        status: "success",
                        message: "create books successfully",
                        data: {
                            book
                        }
                    })
                } else {
                    body.file && (cloudinary.uploader.destroy(body.file.filename))
                    throw new apiError("the book is existing", 409, {
                        book: null
                    })
                }
            } catch (error) {
                body.file && (cloudinary.uploader.destroy(body.file.filename))
                reject(error)
            }
        })
    }

    // READ 
    getBooks({ page,
        limit = +process.env.LIMIT_BOOK_QUERY,
        orderBy,
        available,
        title,
        ...query }) {

        const orderList = []
        orderBy && orderBy.split(",").map(fieldOrder => {
            const [field, direction] = fieldOrder.trim().split(" ")
            orderList.push([field, direction])
        })

        return new Promise(async (resolve, reject) => {
            try {
                const pagination = { raw: true, nest: true }
                const offset = (!page || +page <= 1) ? 0 : (+page - 1)
                pagination.offset = offset * +limit
                pagination.limit = +limit
                orderList.length && (pagination.order = orderList)

                title && (query.title = { [Op.substring]: title })

                available && available.replace('', '').split(',').length === 2
                    && (query.available = { [Op.between]: available.replace('', '').split(',') })

                const { count, rows } = await db.Book.findAndCountAll({
                    where: query,
                    ...pagination,
                    attributes: {
                        exclude: ["categoryCode"]
                    },
                    include: [
                        { model: db.Category, as: 'category', attributes: ["code", "value"] }
                    ]
                })

                if (rows.length) {
                    resolve({
                        code: 200,
                        status: "success",
                        message: count === 1 ? "get book successfully" : "get books successfully",
                        data: {
                            total: count,
                            totalPage: Math.ceil(parseFloat(count) / parseFloat(+limit)),
                            books: rows
                        }
                    })
                } else {
                    resolve({
                        code: 204,
                        status: "success",
                        message: "the book is not found",
                        data: {
                            books: rows
                        }
                    })
                }
            } catch (error) {
                reject(error)
            }
        })
    }

    // UPDATE  
    updateBook(body) {
        console.log("dhasodhaskjdhaskjdhakjdhask")
        return new Promise(async (resolve, reject) => {
            body.file && (body.image = body.file.path) && (body.imageFileName = body.file.filename)
            try {
                const book = await db.Book.findOne({
                    where: { title: body.title },
                })

                if (book) {
                    body.file && (cloudinary.uploader.destroy(body.file.filename))
                    throw new apiError("cannot update the book - book title is existing", 409, {
                        book: null
                    })
                }

                const response = await db.Book.update(
                    {
                        ...body,
                    },
                    {
                        where: { id: body.id },
                        returning: ['*'],
                    }
                )

                if (response[1]) {
                    resolve({
                        code: 200,
                        status: "success",
                        message: "a book is updated successfully",
                        data: {
                            book: await db.Book.findOne({
                                where: { id: body.id },
                            })
                        }
                    })
                } else {
                    body.file && (cloudinary.uploader.destroy(body.file.filename))
                    throw new apiError("cannot update the book - the book is not found", 400, "UpdateBookException")
                }
            } catch (error) {
                body.file && (cloudinary.uploader.destroy(body.file.filename))
                reject(error)
            }
        })
    }

    // DELETE
    deleteBooks({ ids, images }) {
        const arrayId = []
        ids && ids.split(',').map(id => arrayId.push(id.trim()))

        const arrayImage = []
        images && images.split(',').map(image => arrayImage.push(image.trim()))

        return new Promise(async (resolve, reject) => {
            try {
                cloudinary.api.delete_resources(arrayImage)

                const response = await db.Book.destroy({
                    where: { id: arrayId },
                })

                if (response) {
                    resolve({
                        code: 200,
                        status: "success",
                        message: response !== 1 ? `${response} books are updated successfully` : "a book is updated successfully",
                        data: "DeleteBookSuccessfully"
                    })
                } else {
                    throw new apiError("cannot delete the book - book id is not found", 400, "DeleteBookException")
                }
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = BookServices