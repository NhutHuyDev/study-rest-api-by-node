const db = require('../models')
const bookData = require('../data/book/mockupData.json')
const normalizeString = require('../utils/normalizeString')
const generateCode = require('../utils/generateCode')

class DatabaseServices {
    constructor() {
    }

    insert() {
        return new Promise(async (resolve, reject) => {
            const categories = Object.keys(bookData)
            for (let index = 0; index < categories.length; index++) {
                const category = categories[index];
                try {
                    await db.Category.create({
                        code: generateCode(normalizeString(category)),
                        value: category
                    })
                } catch (error) {
                    reject(error)
                    break
                }
            }

            const array = Object.entries(bookData)
            for (let i = 0; i < array.length; i++) {
                const books = array[i][1]
                for (let j = 0; j < books.length; j++) {
                    const book = books[j];
                    try {
                        await db.Book.create({
                            id: book.upc,
                            title: book.bookTitle,
                            categoryCode: generateCode(normalizeString(element[0])),
                            price: parseFloat(book.bookPrice),
                            available: parseInt(book.noAvailable),
                            image: book.imageUrl,
                            description: book.bookDescription,
                        })
                    } catch (error) {
                        reject(error)
                        break
                    }
                }
            }

            resolve({
                code: 201,
                status: "success",
                message: "insert successfull",
            })
        })
    }
}


module.exports = DatabaseServices