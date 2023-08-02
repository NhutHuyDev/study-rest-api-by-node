const jwt = require('jsonwebtoken')

const createToken = (payload, secretKey, expiryDuration) => jwt.sign(payload, secretKey, { expiresIn: expiryDuration })

module.exports = createToken