import UsersModel from './UsersModel'
import CallsignsModel from '../Callsigns/CallsignsModel'
import Mail from '../Mail/Mail'

import randomString from 'randomstring'

exports.create = async (req) => {
  let authCode = randomString.generate(32)
  let callsign = await CallsignsModel.retrieve(req.callsign)
  if (!callsign) {
    return {success: false, message: 'Could not find the callsign'}
  }
  let userId = await UsersModel.create(callsign.id, authCode)

  let to = callsign.callsign + '@arrl.net'
  let link = 'https://eaglelogger.com/activate?code=' + authCode
  let subject = 'EagleLogger New Account'
  let message = `
    Hello ${callsign.callsign},

    To activate your EagleLogger account please click the below link.

    ${link}

    Thanks!
  `
  Mail.create({to, subject, message})

  if (userId) {
    return {success: true, message: 'Account created! Click the activation link in your email.'}
  }
}
