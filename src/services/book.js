const db = require('../models')
const { Op } = require('sequelize')

class BookServices {
    constructor() {
    }

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

                available.replace('', '').split(',').length === 2
                    && (query.available = { [Op.between]: available.replace('', '').split(',') })

                const { count, rows } = await db.Book.findAndCountAll({
                    where: query,
                    ...pagination,
                })

                if (rows.length) {
                    resolve({
                        code: 200,
                        status: "success",
                        message: count === 1 ? "get book successfully" : "get books successfully",
                        data: {
                            total: count,
                            totalPage: Math.ceil(parseFloat(count)/parseFloat(+limit)),
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
}

module.exports = BookServices