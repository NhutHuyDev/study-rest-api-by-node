const jwt = require('jsonwebtoken')

const createToken = (payload, secretKey) => jwt.sign(payload, secretKey, { expiresIn: '5d' })

module.exports = createToken