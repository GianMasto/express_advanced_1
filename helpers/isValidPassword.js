const bCrypt = require('bcrypt')

const isValidPassword = (password1, password2) => {
  return bCrypt.compareSync(password1, password2)
}

module.exports = isValidPassword