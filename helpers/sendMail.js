const nodemailer = require('nodemailer')
const { transport } = require('winston')
const logger = require('./logger')

const sendMail = (service, mailOptions) => {
  let transporterObj
  
  switch (service) {
    case 'ethereal':
      transporterObj = {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.ETHEREAL_USER || 'johnathan.luettgen6@ethereal.email',
            pass: process.env.ETHEREAL_PASSWORD || '1kcMq8ZsBE11e1t8cY'
        }
      }
      break;
    case 'gmail':
      transporterObj = {
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASSWORD
        }
      }
      break;
  
    default:
      logger.error('unvalid mail service provider')
      break;
  }

  const transporter = nodemailer.createTransport(transporterObj)

  transporter.sendMail(mailOptions, (err, info) => {
    if(err) {
      return logger.error(err)
    }
    logger.info(info)
  })
}

module.exports = sendMail