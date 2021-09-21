const client = require('twilio')('AC7693daf7272a0199dc6025d7c87aef3f', '7eaea912cbe6e800fe5916c2e9e61b83');
const logger = require('../helpers/logger')


const sendSms = (body, from, to) => {


  (async () => {
    try {
      const message = await client.messages.create({
        body,
        from,
        to
      })
    
      console.log(message.sid)
    }catch({message}) {
      logger.error(message)
    }

  })()
}

module.exports = sendSms