import UsersModel from './UsersModel'
import Auth from '../Auth/Auth'
import AuthModel from '../Auth/AuthModel'
import CallsignsModel from '../Callsigns/CallsignsModel'
import Mail from '../Mail/Mail'

import bcrypt from 'bcrypt'

exports.create = async (req) => {
  let passwordHash = await bcrypt.hash(req.password, 10)
  let callsign = await CallsignsModel.find(req.callsign)
  if (!callsign) {
    return {success: false, message: 'Could not find the callsign'}
  }

  let userId = await UsersModel.create(callsign.id, passwordHash)

  let code = Auth.code()
  await AuthModel.create(userId, code)

  let to = callsign.callsign + '@arrl.net'
  let link = `http://localhost:8080/activate/${userId}/${code}`
  let subject = 'New EagleLogger Account Activation'
  let message = `
    Hello ${callsign.callsign},

    To activate your EagleLogger account please click this link:

    ${link}


    73,

    --EagleLogger
  `
  Mail.create({to, subject, message})

  if (userId) {
    return {success: true, message: 'Account created! Click the activation link in your email.'}
  }
}
