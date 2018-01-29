import UsersModel from './UsersModel'
import UserSignUpEmail from './UserSignUpEmail'
import UserResetPasswordEmail from './UserResetPasswordEmail'
import Auth from '../Auth/Auth'
import AuthModel from '../Auth/AuthModel'
import CallsignsModel from '../Callsigns/CallsignsModel'
import Mail from '../Mail/Mail'

import bcrypt from 'bcrypt'
import randomString from 'randomstring'

let auth = async (req) => {
  let token = await AuthModel.retrieve(req.token.userId, req.token.code)
  return req.id === token.userId
}

exports.create = async (req) => {
  let passwordHash = await bcrypt.hash(req.password, 10)
  let callsign = await CallsignsModel.find(req.callsign)
  if (!callsign) {
    return {success: false, message: 'Could not find the callsign'}
  }

  let userId = await UsersModel.create(callsign.id, passwordHash)

  let code = Auth.code()
  await AuthModel.create(userId, code)

  let to = callsign.callsign.toLowerCase() + '@arrl.net'
  let link = `http://eaglelogger.com/activate/${userId}/${code}`
  let html = UserSignUpEmail(callsign.callsign, link)
  let subject = 'EagleLogger Account Activation'
  let message = `
    Hello ${callsign.callsign},

    To activate your EagleLogger account please click this link:

    ${link}


    73,

    --EagleLogger
  `
  // Mail.create({to, subject, message, html})

  if (userId) {
    return {success: true, message: 'Account created! Click the activation link in your email.'}
  }
}

exports.resetPassword = async (req) => {
  let callsign = await CallsignsModel.find(req.callsign)
  let user = false
  if (callsign) {
    user = await UsersModel.find(callsign.id)
  }

  if (user) {
    let newPassword = randomString.generate(8).toLowerCase()
    let newPasswordHash = await bcrypt.hash(newPassword, 10)
    let fields = { password_hash: newPasswordHash }

    await UsersModel.update(user.id, fields)

    let to = user.email || callsign.callsign.toLowerCase() + '@arrl.net'
    let html = UserResetPasswordEmail(callsign.callsign, newPassword)
    let subject = 'EagleLogger Password Reset'
    let message = `
      Hello ${callsign.callsign},

      Your password has been reset to:

      ${newPassword}


      73,

      --EagleLogger
    `

    Mail.create({to, subject, message, html})
  }

  return true
}

exports.update = async (req) => {
  if (!(await auth(req))) return false

  let user = await UsersModel.retrieve(req.id)

  let fields = {
    name: req.name,
    email: req.email
  }

  if (req.newPassword && req.newPassword.length) {
    let newPasswordHash = await bcrypt.hash(req.newPassword, 10)
    fields.password_hash = newPasswordHash
  }

  console.log('req.spotterId', req.spotterId)
  if (req.spotterId && req.spotterId !== user.spotterId) {
    console.log('req.spotterId', req.spotterId)
    console.log('req.spotterId', req.spotterId)
    console.log('req.spotterId', req.spotterId)
    console.log('req.spotterId', req.spotterId)
    await CallsignsModel.update(user.callsignId, {spotter_id: req.spotterId})
  }

  await UsersModel.update(req.id, fields)

  return UsersModel.retrieve(req.id)
}

exports.upgrade = async (req) => {
  let user = false
  let token = await AuthModel.retrieve(req.token.userId, req.token.code)
  if (token) user = await UsersModel.retrieve(token.userId)
  if (!(user && user.ncs)) return false

  user = await UsersModel.find(req.id)

  let fields = {
    ncs: true
  }

  return UsersModel.update(user.id, fields)
}
