const asyncErrorHandler = require('../utils/asyncErrorHandler')
const DatabaseServices = require('../services/database')
const databaseServices = new DatabaseServices()

const insert = asyncErrorHandler(async (req, res) => {
    const response = await databaseServices.insert()
    res.json(response)
})

module.exports = {
    insert
}