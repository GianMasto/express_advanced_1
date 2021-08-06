const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
  username: {type: String, require: true},
  password: {type: String, require: true},
})

const UsersMongo = mongoose.model('users', UsersSchema)

module.exports = UsersMongo