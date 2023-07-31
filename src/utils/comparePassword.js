const bcrypt = require('bcryptjs')

const comparePassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword)

module.exports = comparePassword


