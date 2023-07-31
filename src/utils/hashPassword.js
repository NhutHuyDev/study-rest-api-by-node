const bcrypt = require('bcryptjs')

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(5))

module.exports = hashPassword


