const db = require('../models')
const apiError = require('../services/apiError')

class UserServices {
    constructor() {
    }

    getUser(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await db.User.findOne({
                    where: { id },
                    attributes: {
                        exclude: ["password", "roleCode"]
                    },
                    include: [
                        { model: db.Role, as: 'role', attributes: ["code", "value"] }
                    ]
                })

                if (response) {
                    resolve({
                        code: 200,
                        message: "successfully",
                        data: {
                            user: response
                        }
                    })
                } else {
                    throw new apiError("user is not found", 204, "UserException")
                }
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = UserServices