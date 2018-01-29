import NetTypesModel from './NetTypesModel'
import AuthModel from '../Auth/AuthModel'
import UsersModel from '../Users/UsersModel'

let auth = async (req) => {
  let user = false
  let token = await AuthModel.retrieve(req.token.userId, req.token.code)
  if (token) user = await UsersModel.retrieve(token.userId)
  return user && user.ncs
}

exports.create = async (req) => {
  if (!(await auth(req))) return false

  return NetTypesModel.create(req.name)
}

exports.delete = async (req) => {
  if (!(await auth(req))) return false
  req.fields = { deleted: true }

  NetTypesModel.update(req)
}

exports.list = async (req) => {
  let deleted = !!req.deleted
  return NetTypesModel.list(deleted)
}

exports.retrieve = async (req) => {
  return NetTypesModel.retrieve(req.netId)
}

exports.update = async (req) => {
  if (!(await auth(req))) return false

  req.fields = {
    name: req.name,
    freq: req.freq,
    nts: req.nts,
    starttime: req.starttime
  }

  NetTypesModel.update(req)
}
