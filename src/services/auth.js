const db = require('../models')
const hashPasword = require('../utils/hashPassword')
const comparePassword = require('../utils/comparePassword')
const createToken = require('../utils/createToken')
const apiError = require('../services/apiError')

class AuthServices {
    constructor() {
    }

    register({ roleCode, name, avatar, email, password }) {
        return new Promise(async (resolve, reject) => {
            try {
                const [user, created] = await db.User.findOrCreate({
                    where: { email },   
                    defaults: {
                        roleCode: roleCode || "R3",
                        name,
                        avatar: avatar || "src/assets/img/user-avatar.webp",
                        email,
                        password: hashPasword(password)
                    }
                });

                if (created) {
                    resolve({
                        code: 201,
                        status: "success",
                        message: "register successfully",
                        data: {
                            authToken: "Bearer " + createToken({
                                id: user.id,
                                email: user.email,
                                roleCode: user.roleCode
                            }, process.env.JWT_SECRET_TOKEN)
                        }
                    })
                } else {
                    throw new apiError("your email is used by other account", 400, "RegisterException")
                }
            } catch (error) {
                reject(error)
            }
        })
    }

    login({ email, password }) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await db.User.findOne({
                    where: { email },
                });

                if (user) {
                    if (comparePassword(password, user.password)) {
                        resolve({
                            code: 200,
                            status: "success",
                            message: "login successfully",
                            data: {
                                authToken: "Bearer " + createToken({
                                    id: user.id,
                                    email: user.email,
                                    roleCode: user.roleCode
                                }, process.env.JWT_SECRET_TOKEN)
                            }
                        })
                    } else {
                        throw new apiError("email or password is incorrect", 400, "InvalidAuthentication")
                    }
                } else {
                    throw new apiError("email or password is incorrect", 400, "InvalidAuthentication")
                }
            } catch (error) {
                reject(error)
            }
        })
    }

}




module.exports = AuthServices