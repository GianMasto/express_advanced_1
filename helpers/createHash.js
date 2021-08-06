const bCrypt = require('bcrypt')

const createHash = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}

module.exports = createHash