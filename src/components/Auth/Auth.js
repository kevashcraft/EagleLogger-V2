import AuthModel from './AuthModel'
import CallsignsModel from '../Callsigns/CallsignsModel'
import UsersModel from '../Users/UsersModel'

import bcrypt from 'bcrypt'
import { createHash } from 'crypto'
import randomString from 'randomstring'
import uuidV4 from 'uuid/v4'

exports.activate = async (req) => {
  let token = await AuthModel.retrieve(req.userId, req.code)
  if (token) {
    let fields = {active: true}
    await UsersModel.update(token.userId, fields)
    let user = await UsersModel.retrieve(token.userId)
    let callsign = await CallsignsModel.retrieve(user.callsignId)

    return {
      statue: true,
      userId: req.userId,
      code: req.code,
      callsign: callsign.callsign
    }
  } else {
    return false
  }
}

exports.code = () => {
  let seconds = Date.now()
  let string = randomString.generate(32)
  let uuid = uuidV4()

  let code = createHash('sha256').update(seconds + string + uuid).digest('hex')

  return code
}

exports.create = async (req) => {
  let callsign = await CallsignsModel.find(req.callsign)
  if (!callsign) return false

  let user = await UsersModel.find(callsign.id)
  if (!user) return false

  if (!req.password) return false
  let valid = await bcrypt.compare(req.password, user.passwordHash)

  if (valid) {
    let code = exports.code()
    await AuthModel.create(user.id, code)
    return {
      status: true,
      code: code,
      userId: user.id
    }
  } else {
    return {status: false}
  }
}
