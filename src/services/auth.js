const db = require('../models')
const hashPasword = require('../utils/hashPassword')
const comparePassword = require('../utils/comparePassword')
const createToken = require('../utils/createToken')
const apiError = require('../services/apiError')
const jwt = require('jsonwebtoken')

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
                        avatar: avatar || "https://res.cloudinary.com/dvrknnoaf/image/upload/v1691033905/study-rest-api-by-node/users/user-avatar_ukcpom.webp",
                        email,
                        password: hashPasword(password),
                    }
                });

                const refreshToken = createToken({
                    id: user.id,
                    email: user.email,
                    roleCode: user.roleCode
                }, process.env.JWT_SECRET_KEY_REFRESH_TOKEN, process.env.EXPIRED_DURATION_REFRESH_TOKEN)

                if (created) {
                    resolve({
                        code: 201,
                        status: "success",
                        message: "register successfully",
                        data: {
                            accessToken: createToken({
                                id: user.id,
                                email: user.email,
                                roleCode: user.roleCode
                            }, process.env.JWT_SECRET_KEY_ACCESS_TOKEN, process.env.EXPIRED_DURATION_ACCESS_TOKEN),
                            refreshToken
                        }
                    })

                    refreshToken && (
                        await db.User.update(
                            { refreshToken },
                            { where: { id: user.id } }
                        )
                    )

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

                const refreshToken = createToken({
                    id: user.id,
                    email: user.email,
                    roleCode: user.roleCode
                }, process.env.JWT_SECRET_KEY_REFRESH_TOKEN, process.env.EXPIRED_DURATION_REFRESH_TOKEN)

                if (user) {
                    if (comparePassword(password, user.password)) {
                        resolve({
                            code: 200,
                            status: "success",
                            message: "login successfully",
                            data: {
                                accessToken: createToken({
                                    id: user.id,
                                    email: user.email,
                                    roleCode: user.roleCode
                                }, process.env.JWT_SECRET_KEY_ACCESS_TOKEN, process.env.EXPIRED_DURATION_ACCESS_TOKEN),
                                refreshToken
                            }
                        })

                        refreshToken && (
                            await db.User.update(
                                { refreshToken },
                                { where: { id: user.id } }
                            )
                        )

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

    refreshAccessToken(refreshToken) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!refreshToken)
                    throw new apiError('missing refresh token', 400, "AuthException")


                jwt.verify(refreshToken, process.env.JWT_SECRET_KEY_REFRESH_TOKEN, async (err) => {
                    try {
                        if (err) {
                            const expiredToken = err instanceof jwt.TokenExpiredError

                            if (expiredToken) {
                                throw new apiError("refresh token is expired. Please Login to get new ", 401, { expiredToken: true })
                            } else {
                                throw new apiError("refresh token is invalid", 401, { invalidToken: true })
                            }
                        }

                        const user = await db.User.findOne({
                            where: { refreshToken }
                        })


                        resolve({
                            code: 200,
                            status: "success",
                            message: "refresh access token successfully",
                            data: {
                                accessToken: createToken({
                                    id: user.id,
                                    email: user.email,
                                    roleCode: user.roleCode
                                }, process.env.JWT_SECRET_KEY_ACCESS_TOKEN, process.env.EXPIRED_DURATION_ACCESS_TOKEN),
                                refreshToken
                            }
                        })
                    } catch (error) {
                        reject(error)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }

}




module.exports = AuthServices