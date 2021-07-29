const { normalize, schema } = require('normalizr')

const normalizeMessages = (array) => {
  const messages = {
    id: 1,
    messages: [...array]
  }

  const usersSchema = new schema.Entity('users', {}, {idAttribute: 'email'})

  const messageSchema = new schema.Entity('messages', {
      author: usersSchema
  }, {idAttribute: 'date'})

  const messagesSchema = new schema.Entity('all_messages', {
      messages: [messageSchema]
  }, {idAttribute: "id"})

  return normalize(messages, messagesSchema)
}

module.exports = normalizeMessages